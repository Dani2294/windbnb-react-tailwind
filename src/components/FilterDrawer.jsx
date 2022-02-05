import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	MdAdd,
	MdClose,
	MdLocationOn,
	MdRemove,
	MdSearch,
} from 'react-icons/md';
import { useSpring, animated } from 'react-spring';

function FilterDrawer({
	isOpen,
	handleDrawer,
	data,
	locationVal,
	guests,
	handleLocation,
	handleGuests,
	handleSubmit,
	adultCount,
	childrenCount,
}) {
	const drawerOverlayRef = useRef();
	const props = useSpring({
		from: { opacity: 0, marginTop: -800 },
		to: { opacity: 1, marginTop: 0 },
		config: { duration: 300 },
	});

	const [filterShow, setFilterShow] = useState({
		location: true,
		guests: false,
	});
	const handleFilterShow = (input) => {
		input === 'location'
			? setFilterShow((val) => {
					return {
						location: true,
						guests: false,
					};
			  })
			: setFilterShow((val) => {
					return {
						location: false,
						guests: true,
					};
			  });
	};

	const closeDrawerClick = (e) => {
		if (drawerOverlayRef.current === e.target) {
			handleDrawer();
		}
	};

	const escapePress = useCallback(
		(e) => {
			if (e.key === 'Escape' && isOpen) {
				handleDrawer();
			}
		},
		[handleDrawer, isOpen]
	);

	useEffect(() => {
		document.addEventListener('keydown', escapePress);
		return () => document.removeEventListener('keydown', escapePress);
	}, [escapePress]);

	const cities = [...new Set(data.map((d) => d.city))];
	return (
		<div
			ref={drawerOverlayRef}
			onClick={closeDrawerClick}
			className='fixed inset-0 h-full w-full bg-black bg-opacity-75 z-10 animation transition-all'>
			<animated.div style={props} className='relative bg-white font-font2'>
				<div className='max-w-screen-xl mx-auto px-3 pb-6 md:py-24'>
					<div className='flex items-center justify-between py-5 md:hidden'>
						<span className='text-xs text-grey-400 font-bold'>
							Edit your search
						</span>
						<button onClick={() => handleDrawer()} aria-label='close filter'>
							<MdClose className='text-grey-400 text-lg' />
						</button>
					</div>
					<form
						onSubmit={(e) => handleSubmit(e)}
						id='filterForm'
						className='sm:flex shadow-base rounded-2xl  mb-9'>
						<div
							onClick={() => handleFilterShow('location')}
							className='relative w-full px-1 pb-1'>
							<input
								value={locationVal}
								onChange={(e) => handleLocation(e)}
								type='text'
								name='location'
								id='location'
								placeholder='Add a location'
								className='relative text-sm pt-7 pb-3 px-6 rounded-2xl outline-none focus:outline-grey-400 active:outline-grey-400 placeholder:text-grey-100 w-full'
							/>
							<label
								htmlFor='location'
								className='absolute left-6 top-3 text-[0.562rem] text-grey-400 font-bold uppercase'>
								Location
							</label>
						</div>

						<div
							onClick={() => handleFilterShow('guests')}
							className='relative border-t border-t-gray-50 sm:border-l sm:border-r sm:border-l-gray-50 sm:border-r-gray-50 w-full px-1'>
							<input
								value={`${guests === 0 ? '' : guests + ' guests'}`}
								readOnly='readonly'
								type='text'
								name='guests'
								id='guests'
								placeholder='Add guests'
								className='relative text-sm pt-7 pb-3 px-6 rounded-2xl outline-none focus:outline-grey-400 active:outline-grey-400 placeholder:text-grey-100 w-full'
							/>
							<label
								htmlFor='guests'
								className='absolute left-6 top-3 text-[0.562rem] text-grey-400 font-bold uppercase'>
								Guests
							</label>
						</div>
						<div className='w-full hidden md:flex items-center justify-center py-[3px]'>
							<button
								type='submit'
								className='flex items-center py-3 px-7 bg-brand rounded-2xl'>
								<MdSearch className='text-grey-50 text-[30px] mr-2' />
								<span className='clamp-3 text-grey-50 font-bold'>Search</span>
							</button>
						</div>
					</form>
					{/* FILTER SUBSECTION */}
					<div className='min-h-[170px] grid sm:grid-cols-2 md:grid-cols-3 sm:space-x-1 mb-14 md:mb-0'>
						<ul
							className={`${
								filterShow.location ? 'block' : 'hidden'
							} px-6 space-y-6`}>
							{cities.map((city, idx) => (
								<li key={`${city}-${idx}`} className='flex items-center'>
									<MdLocationOn className='text-grey-300 mr-3 text-lg' />
									<span className='text-grey-300 text-sm'>{city}, Finland</span>
								</li>
							))}
						</ul>
						<div
							className={`${
								filterShow.guests ? 'block sm:col-start-2' : 'hidden'
							} px-6 space-y-10`}>
							<div>
								<p className='text-grey-400 text-sm font-bold -mb-2'>Adults</p>
								<span className='text-grey-100 text-xs'>Ages 13 or above</span>

								<div className='flex items-center space-x-4 mt-2'>
									<button
										onClick={() => handleGuests('minus', 'adult')}
										className='border border-grey-200 rounded text-grey-200 text-xs p-[2px]'>
										<MdRemove />
									</button>
									<span className='text-grey-400 text-sm'>{adultCount}</span>
									<button
										onClick={() => handleGuests('add', 'adult')}
										className='border border-grey-200 rounded text-grey-200 text-xs p-[2px]'>
										<MdAdd />
									</button>
								</div>
							</div>
							<div>
								<p className='text-grey-400 text-sm font-bold -mb-2'>
									Children
								</p>
								<span className='text-grey-100 text-xs'>Ages 2-12</span>

								<div className='flex items-center space-x-4 mt-2'>
									<button
										onClick={() => handleGuests('minus', 'children')}
										className='border border-grey-200 rounded text-grey-200 text-xs p-[2px]'>
										<MdRemove />
									</button>
									<span className='text-grey-400 text-sm'>{childrenCount}</span>
									<button
										onClick={() => handleGuests('add', 'children')}
										className='border border-grey-200 rounded text-grey-200 text-xs p-[2px]'>
										<MdAdd />
									</button>
								</div>
							</div>
						</div>
					</div>

					<button
						type='submit'
						form='filterForm'
						className='flex items-center py-3 px-7 bg-brand rounded-2xl md:hidden mx-auto'>
						<MdSearch className='text-grey-50 text-[30px] mr-2' />
						<span className='clamp-3 text-grey-50 font-bold'>Search</span>
					</button>
				</div>
			</animated.div>
		</div>
	);
}

export default FilterDrawer;
