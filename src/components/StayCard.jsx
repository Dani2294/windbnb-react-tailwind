import React from 'react';
import { MdStar } from 'react-icons/md';

function StayCard({ stay }) {
	return (
		<div>
			<img
				src={stay.photo}
				alt={stay.title}
				className='rounded-3xl w-full h-[250px] sm:h-[270px] object-cover object-center'
			/>
			<div className='mt-4'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center'>
						{stay.superHost && (
							<span className='clamp-4 mr-3 rounded-xl uppercase text-grey-300 border border-grey-300 font-bold py-1 px-2'>
								super host
							</span>
						)}{' '}
						<p className='clamp-3 text-grey-200'>
							{stay.type} &bull; {stay.beds} beds
						</p>
					</div>
					<div className='flex items-center'>
						<MdStar className='text-brand text-[25px] mr-2' />
						<span className='clamp-3 text-grey-300'>{stay.rating}</span>
					</div>
				</div>
				<div className='mt-3'>
					<p className='clamp-2 text-grey-400 font-bold'>{stay.title}</p>
				</div>
			</div>
		</div>
	);
}

export default StayCard;
