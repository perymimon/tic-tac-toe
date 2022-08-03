import './stopWatch.scss'

export function StopWatch() {

      return (
       <tk-stopwatch>
          <svg className="tk-stopwatch" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <g viewBox="0 0 448 512">
                    <path
                        d="M 258.71 6.962 C 276.41 6.962 290.71 21.292 290.71 38.962 C 290.71 56.632 276.41 70.962 258.71 70.962 L 242.71 70.962 L 242.71 105.412 C 280.21 111.162 314.41 126.962 342.41 149.962 L 364.11 128.362 C 376.61 115.862 396.81 115.862 409.31 128.362 C 421.81 140.862 421.81 161.062 409.31 173.562 L 385.21 197.762 C 406.41 230.262 418.71 269.162 418.71 310.962 C 418.71 425.862 325.61 518.962 210.71 518.962 C 95.81 518.962 2.71 425.862 2.71 310.962 C 2.71 206.962 79.03 120.762 178.71 105.412 L 178.71 70.962 L 162.71 70.962 C 145.01 70.962 130.71 56.632 130.71 38.962 C 130.71 21.292 145.01 6.962 162.71 6.962 L 258.71 6.962 Z"
                    />
                    <path name="calipers"
                          d="M 234.71 198.962 C 234.71 185.662 224.01 174.962 210.71 174.962 C 197.41 174.962 186.71 185.662 186.71 198.962 L 186.71 326.962 C 186.71 340.262 197.41 350.962 210.71 350.962 C 224.01 350.962 234.71 340.262 234.71 326.962 L 234.71 198.962 Z"
                    />
                </g>
            </svg>
        </tk-stopwatch>
    )
}