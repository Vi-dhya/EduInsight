export default function Logo({ collapsed = false }) {
  const logoImage = localStorage.getItem('logoImage')
  const logoName = localStorage.getItem('logoName')

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      {logoImage ? (
        <>
          <img
            src={logoImage}
            alt="Logo"
            className={`transition-all duration-300 object-contain ${collapsed ? 'w-10 h-10' : 'w-16 h-16'}`}
          />
          {!collapsed && logoName && (
            <p className="text-xs text-gray-300 text-center font-semibold">{logoName}</p>
          )}
        </>
      ) : (
        <svg
          width={collapsed ? "40" : "60"}
          height={collapsed ? "40" : "60"}
          viewBox="0 0 100 100"
          className="transition-all duration-300"
        >
          {/* Orange Circle - Top */}
          <circle cx="50" cy="30" r="20" fill="#FF8C42" />
          <circle cx="50" cy="30" r="12" fill="white" />
          <circle cx="50" cy="30" r="6" fill="#FF8C42" />

          {/* Blue Circle - Bottom Left */}
          <circle cx="30" cy="65" r="20" fill="#0099D8" />
          <circle cx="30" cy="65" r="12" fill="white" />
          <circle cx="30" cy="65" r="6" fill="#0099D8" />

          {/* Green Circle - Bottom Right */}
          <circle cx="70" cy="65" r="20" fill="#7BC043" />
          <circle cx="70" cy="65" r="12" fill="white" />
          <circle cx="70" cy="65" r="6" fill="#7BC043" />
        </svg>
      )}
    </div>
  )
}
