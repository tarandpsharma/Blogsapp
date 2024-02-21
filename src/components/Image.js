import React from 'react';
import Img from './taran.jpg';

export const Image = () => {
    return (
        <div className='flex justify-center items-center mt-16'>
            <div className='bg-gray-100 rounded-lg p-8 shadow-lg flex flex-col md:flex-row'>
                <div className='md:w-1/3 mr-4 mb-4 md:mb-0'>
                    <img src={Img} alt='Taran' className='rounded-lg w-full h-auto' />
                </div>
                <div className='md:w-2/3'>
                    <h1 className='text-2xl font-bold mb-4'>Hey there, I'm Taran</h1>
                    <p className='text-base text-gray-800 leading-relaxed'>
                        I'm a software engineer hailing from the vibrant town of Mansa, Punjab. With a passion for crafting innovative solutions through code, I delve into the dynamic world of software development with enthusiasm and dedication. From designing user-friendly interfaces to solving complex algorithms, I thrive on the challenges that come my way.
                    </p>
                    <p className='text-base text-gray-800 leading-relaxed mt-4'>
                        Join me on my blogging journey as I share insights, tips, and experiences from the realm of technology, striving to inspire fellow enthusiasts and contribute to the ever-evolving landscape of software engineering.
                    </p>

                    <h2 className='mt-40 text-center font-bold text-3xl'> Stay Connected!</h2>
                </div>
            </div>
        </div>
    );
}


