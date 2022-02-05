import React from 'react';
import StayCard from './StayCard';

function Stays({ data }) {
	return (
		<main>
			<div className='max-w-screen-xl mx-auto px-3 py-16'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='clamp-1 text-grey-400 font-bold'>Stays in Finland</h1>
					<p className='clamp-3 text-grey-300'>{data.length}+ stays</p>
				</div>
				<section className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{data.map((stay, idx) => (
						<StayCard key={`${stay.title}-${idx}`} stay={stay} />
					))}
				</section>
			</div>
		</main>
	);
}

export default Stays;
