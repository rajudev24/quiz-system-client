import Image from 'next/image';
import welcomeImage from "/public/imgs/welcome.png";
import Header from '@/components/Header/Header';


const welcome = () => {
    return (
        <>
            <Header />
            <h1 className='text-center text-indigo-600'> Welcome to the Online Test</h1>
            <div className='flex justify-center items-center'>
                <Image src={welcomeImage} alt='image' width={500} height={500} />
            </div>
        </>
    );
};

export default welcome;