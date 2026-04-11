const iconStyle = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  verticalAlign: 'middle'
};

export const RailwayIcon = ({ size = '1em', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ ...iconStyle, width: size, height: size }}
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C8 2 4 3 4 7v10c0 2.21 1.79 4 4 4l-2 2v1h12v-1l-2-2c2.21 0 4-1.79 4-4V7c0-4-4-5-8-5zm0 2c3.51 0 4.96.48 5.57 1H6.43c.61-.52 2.06-1 5.57-1zM6 7h5v3H6V7zm7 0h5v3h-5V7zm-4.5 8c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
  </svg>
);

export const GovernmentIcon = ({ size = '1em', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ ...iconStyle, width: size, height: size }}
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3L2 8v2h20V8L12 3zM4 12v7h2v-7H4zm4 0v7h2v-7H8zm4 0v7h2v-7h-2zm4 0v7h2v-7h-2zm4 0v7h2v-7h-2zM2 21h20v2H2v-2z"/>
  </svg>
);

export const EducationIcon = ({ size = '1em', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ ...iconStyle, width: size, height: size }}
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

export const HealthcareIcon = ({ size = '1em', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ ...iconStyle, width: size, height: size }}
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
  </svg>
);

export const SmartCityIcon = ({ size = '1em', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{ ...iconStyle, width: size, height: size }}
    className={className}
    aria-hidden="true"
  >
    <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
  </svg>
);

export const serviceIcons = {
  railway: RailwayIcon,
  government: GovernmentIcon,
  education: EducationIcon,
  healthcare: HealthcareIcon,
  smartcity: SmartCityIcon
};

export const getServiceIcon = (serviceId) => {
  return serviceIcons[serviceId] || null;
};
