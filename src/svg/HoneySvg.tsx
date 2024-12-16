export function HoneySvg() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 200'
      width='50'
      height='50'
    >
      {/* Pot Body   */}
      <ellipse
        cx='100'
        cy='120'
        rx='50'
        ry='40'
        fill='#FFA200'
        stroke='#FF6E00'
        stroke-width='4'
      />
      <path
        d='M50 120c0 20 40 40 50 40s50-20 50-40'
        fill='#FFA200'
        stroke='#FF6E00'
        stroke-width='4'
      />

      {/* Pot Neck */}
      <rect
        x='65'
        y='80'
        width='70'
        height='20'
        rx='10'
        ry='10'
        fill='#FF9100'
        stroke='#FF6E00'
        stroke-width='4'
      />

      {/* Pot Lid */}
      <ellipse
        cx='100'
        cy='80'
        rx='50'
        ry='15'
        fill='#FF6E00'
        stroke='#FF9100'
        stroke-width='4'
      />

      {/* Honey at the Pot Opening */}
      <path
        d='M70 95c0 10 20 10 30 10s30 0 30-10'
        fill='#FFC105'
        stroke='#FF9100'
        stroke-width='2'
      />

      {/* Honey Text */}
      <text
        x='50%'
        y='140'
        text-anchor='middle'
        fill='#8C3E21'
        font-family='Arial, sans-serif'
        font-size='18'
        font-weight='bold'
      >
        HH
      </text>
    </svg>
  );
}
