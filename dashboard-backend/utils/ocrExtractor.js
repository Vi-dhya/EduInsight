import Tesseract from 'tesseract.js'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

// Extract marks from image using OCR
export const extractMarksFromImage = async (imagePath) => {
  try {
    // Preprocess image for better OCR accuracy
    const processedImagePath = await preprocessImage(imagePath)
    
    // Run OCR
    const { data: { text } } = await Tesseract.recognize(
      processedImagePath,
      'eng',
      { logger: m => console.log('OCR Progress:', m.progress) }
    )
    
    console.log('OCR Text:', text)
    
    // Extract marks from text
    const marks = extractMarksFromText(text)
    
    // Clean up processed image
    if (processedImagePath !== imagePath) {
      fs.unlinkSync(processedImagePath)
    }
    
    return marks
  } catch (error) {
    console.error('OCR Error:', error)
    throw new Error('Failed to extract marks from image: ' + error.message)
  }
}

// Preprocess image for better OCR
const preprocessImage = async (imagePath) => {
  try {
    const processedPath = imagePath.replace(/\.[^.]+$/, '_processed.png')
    
    await sharp(imagePath)
      .grayscale() // Convert to grayscale
      .normalize() // Normalize contrast
      .sharpen() // Sharpen edges
      .toFile(processedPath)
    
    return processedPath
  } catch (error) {
    console.error('Image preprocessing error:', error)
    return imagePath // Return original if preprocessing fails
  }
}

// Extract marks from OCR text
const extractMarksFromText = (text) => {
  const marks = {
    internal1: null,
    internal2: null,
    total: null,
    confidence: 0
  }
  
  // Split text into lines
  const lines = text.split('\n').map(line => line.trim())
  
  // Look for patterns like "Internal 1: 25" or "25/50"
  const patterns = [
    /internal\s*1[:\s]+(\d+)/i,
    /internal\s*2[:\s]+(\d+)/i,
    /total[:\s]+(\d+)/i,
    /marks[:\s]+(\d+)/i,
    /(\d+)\s*\/\s*50/, // Pattern like "25/50"
    /(\d+)\s*\/\s*100/, // Pattern like "50/100"
  ]
  
  let foundMarks = []
  
  // Search for marks in text
  for (const line of lines) {
    // Look for internal 1
    if (!marks.internal1) {
      const match = line.match(/internal\s*1[:\s]+(\d+)/i)
      if (match) marks.internal1 = parseInt(match[1])
    }
    
    // Look for internal 2
    if (!marks.internal2) {
      const match = line.match(/internal\s*2[:\s]+(\d+)/i)
      if (match) marks.internal2 = parseInt(match[1])
    }
    
    // Look for total
    if (!marks.total) {
      const match = line.match(/total[:\s]+(\d+)/i)
      if (match) marks.total = parseInt(match[1])
    }
    
    // Look for any numbers that might be marks
    const numberMatches = line.match(/\d+/g)
    if (numberMatches) {
      foundMarks = foundMarks.concat(numberMatches.map(n => parseInt(n)))
    }
  }
  
  // If we didn't find specific marks, try to infer from found numbers
  if (!marks.internal1 && foundMarks.length > 0) {
    marks.internal1 = foundMarks[0]
  }
  if (!marks.internal2 && foundMarks.length > 1) {
    marks.internal2 = foundMarks[1]
  }
  if (!marks.total && foundMarks.length > 2) {
    marks.total = foundMarks[2]
  }
  
  // Validate marks are reasonable (0-100)
  if (marks.internal1 && (marks.internal1 < 0 || marks.internal1 > 100)) {
    marks.internal1 = null
  }
  if (marks.internal2 && (marks.internal2 < 0 || marks.internal2 > 100)) {
    marks.internal2 = null
  }
  if (marks.total && (marks.total < 0 || marks.total > 100)) {
    marks.total = null
  }
  
  // Calculate confidence based on how many marks we found
  const foundCount = [marks.internal1, marks.internal2, marks.total].filter(m => m !== null).length
  marks.confidence = (foundCount / 3) * 100
  
  return marks
}

export default extractMarksFromImage
