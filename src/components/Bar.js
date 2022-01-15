import React from "react";
import { useEffect, useState } from "react";
import './Bar.scss'

function Bar({ index, length, color, changeArray }) {
	const [len, setLen] = useState(length);

    useEffect(() => {
        setLen(length);
    }, [length]);

	const startColor = 'rgba(252, 90, 141,1)'
	const completeColor = 'rgba(98, 171, 55, 1)'
	

	const colors = [
		[`${startColor}`, 'rgba(252, 90, 141, 0.18)'],
		['rgba(255, 248, 232, 1)', 'rgba(255, 248, 232, 0.3)'],
		[`${completeColor}`, 'rgba(149, 191, 116, 0.00)'],
		[`#19297C`],
	];

	// const barStyle = {
	// 	height: length,
	// };

	const inputStyle = {
		position: 'relative',
		top: Math.floor(length / 2) - 12,
		width: length,
		left: -Math.floor(length / 2) + 13,
		border: 'none',
		background: 'none',
	};

	const bottom = {
		transform: `translateY(${200 - length}px) rotateX(-90deg)`,
		backgroundColor: `${colors[color][0]}`,
		boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
		trasistion: '0.3s',
	};

	const front_back_right_left = {
		height: `${length}px`,
		transform: `translateY(${200 - length}px)`,
		backgroundColor: `${colors[color][0]}`,
		boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
		transition: '0.3s',
	};

	const quantity = {
		position: 'relative',
		top: 225,
	};

	const handleChange = (e) => {
		let val = e.target.value;
		if (val === '') {
			setLen(0);
      // change the array everytime we set the length
			changeArray(index, 0);
		} else {
			val = parseInt(val);
			if (val > 200) {
				setLen(200);
        // if the value is greater than 200, change the array index value
				changeArray(index, 200);
			} else {
				setLen(val);
        //change the array value at the index
				changeArray(index, val);
			}
		}
	};

    const increment = (e) => {
        setLen(len + 1);
        changeArray(index, len);
    }

    const decrement = (e) => {
        setLen(len - 1);
        changeArray(index, len);
    }

	return (
		<>
			<div className='bar'>
				<div className='side top'></div>
				<div className='side bottom' style={bottom}></div>
				<div className='side right'>
					<div
						className='color-bar right-color-bar'
						style={front_back_right_left}
					></div>
				</div>
				<div className='side left'>
					<div
						className='color-bar left-color-bar'
						style={front_back_right_left}
					></div>
				</div>
				<div className='side front'>
					<div
						className='color-bar front-color-bar'
						style={front_back_right_left}
					>
						<input
							type='number'
							length={len}
							style={inputStyle}
							value={len}
							className='input'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='side back'>
					<div
						className='color-bar back-color-bar'
						style={front_back_right_left}
					></div>
				</div>
				
				
			</div>
		</>
	);
}

export default Bar;