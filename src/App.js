import Header from './components/Header';
import data from './data/stays.json';
import { IconContext } from 'react-icons';
import Stays from './components/Stays';
import { useEffect, useState } from 'react';
import FilterDrawer from './components/FilterDrawer';

function App() {
	const [staysArr, setStaysArr] = useState(data);
	const [isOpen, setIsOpen] = useState(false);

	const [locationVal, setLocationVal] = useState('');
	const [guests, setGuests] = useState(0);

	const [adultCount, setAdultCount] = useState(0);
	const [childrenCount, setChildrenCount] = useState(0);

	useEffect(() => {
		const filteredStays =
			locationVal !== ''
				? data.filter((stay) => {
						return stay.city.toLowerCase().includes(locationVal.toLowerCase());
				  })
				: locationVal === '' && guests > 0
				? data.filter((stay) => {
						return guests <= stay.maxGuests;
				  })
				: data;

		setStaysArr(filteredStays);
	}, [locationVal, guests]);

	const handleDrawer = () => {
		setIsOpen(!isOpen);
	};

	const handleLocation = (e) => {
		setLocationVal(e.target.value);
	};

	const handleGuests = (counter, type) => {
		if (counter === 'add') {
			setGuests(guests + 1);
			if (type === 'adult') {
				setAdultCount(adultCount + 1);
			} else if (type === 'children') {
				setChildrenCount(childrenCount + 1);
			}
		} else if (counter === 'minus') {
			if (guests === 0) return;
			setGuests(guests - 1);
			if (type === 'adult') {
				setAdultCount(adultCount - 1);
			} else if (type === 'children') {
				setChildrenCount(childrenCount - 1);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	return (
		<IconContext.Provider value={{}}>
			<div className='font-font1'>
				<Header
					locationVal={locationVal}
					guests={guests}
					handleDrawer={handleDrawer}
				/>
				<Stays data={staysArr} />
				{isOpen && (
					<FilterDrawer
						handleDrawer={handleDrawer}
						isOpen={isOpen}
						data={staysArr}
						locationVal={locationVal}
						guests={guests}
						setLocationVal={setLocationVal}
						handleLocation={handleLocation}
						handleSubmit={handleSubmit}
						handleGuests={handleGuests}
						adultCount={adultCount}
						childrenCount={childrenCount}
					/>
				)}
			</div>
		</IconContext.Provider>
	);
}

export default App;
