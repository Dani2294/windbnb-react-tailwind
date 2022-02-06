import React from 'react';
import logo from '../assets/logo.png';
import { MdSearch } from 'react-icons/md';

function Header({ locationVal, guests, handleDrawer }) {
	return (
		<header className='py-8'>
			<div className='max-w-screen-xl mx-auto px-3'>
				<div className='sm:flex justify-between items-center'>
					<a href='index.html' className='block mb-10 sm:mb-0'>
						<img src={logo} alt='logo' />
					</a>

					<div
						onClick={() => handleDrawer()}
						className='flex max-w-[19rem] mx-auto sm:max-w-none sm:mx-0 shadow-base rounded-2xl cursor-pointer'>
						<div className='flex items-center justify-center py-5 px-4 text-grey-400 text-sm font-font2'>
							{locationVal ? (
								locationVal + ', Finland'
							) : (
								<span className='text-grey-100'>Add Location</span>
							)}
						</div>
						<div className='flex items-center justify-center border-l border-r border-l-gray-50 border-r-gray-50 py-5 px-4 text-sm font-font2'>
							{guests ? (
								guests + ' guests'
							) : (
								<span className='text-grey-100'>Add guests</span>
							)}
						</div>
						<div className='flex items-center justify-center px-3'>
							<MdSearch className='text-brand text-[30px]' />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
