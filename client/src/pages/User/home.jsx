import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import real from '../../assets/real.jpg'
import home from '../../assets/home.jpeg'
import ListingItem from '../../components/ListingItem';
import HeroSection from '../../components/hero';

function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation, Autoplay, Pagination]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?offer=true&limit=3');
        const data = await res.json();
        setOfferListing(data);
      } catch (error) {
        console.error('Error fetching offer listings:', error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?type=rent&limit=3');
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.error('Error fetching rent listings:', error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/user/listing/listing/id:/?type=sale&limit=3');
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.error('Error fetching sale listings:', error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <Header />
      
      {/* Hero Section */}
      <HeroSection/>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <img 
              className="mx-auto w-32 h-32 object-contain mb-6" 
              src={real} 
              alt="DreamLine Real Estate" 
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Trusted Real Estate Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              DreamLine connects you with exceptional properties and experienced professionals 
              to make your home buying or selling journey seamless and successful.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">5,000+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-blue-900 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Slider */}
      {offerListing && offerListing.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600">
                Discover our handpicked selection of exceptional homes
              </p>
            </div>
            
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              className="rounded-2xl shadow-2xl"
            >
              {offerListing.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div
                    style={{
                      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${listing.imageUrl[0]}) center no-repeat`,
                      backgroundSize: 'cover'
                    }}
                    className="h-[400px] md:h-[500px] lg:h-[600px] flex items-end"
                  >
                    <div className="p-8 text-white w-full bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">Exclusive Offer</h3>
                      <p className="text-lg opacity-90">Don't miss out on these amazing deals</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Property Sections */}
      <section className="py-16 bg-white">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-16'>
            
            {/* Recent Offers */}
            {offerListing && offerListing.length > 0 && (
              <div className="group">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                  <div>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                      Special Offers
                    </h2>
                    <p className="text-gray-600">Limited time deals on premium properties</p>
                  </div>
                  <Link 
                    className='text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors duration-300 group-hover:gap-3' 
                    to={'/search?offer=true'}
                  >
                    View All Offers
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {offerListing.map((listing) => (
                    <div key={listing._id} className="transform hover:scale-105 transition-transform duration-300">
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rent Listings */}
            {rentListing && rentListing.length > 0 && (
              <div className="group">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                  <div>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                      For Rent
                    </h2>
                    <p className="text-gray-600">Find your perfect rental property</p>
                  </div>
                  <Link 
                    className='text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors duration-300 group-hover:gap-3' 
                    to={'/search?type=rent'}
                  >
                    View All Rentals
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {rentListing.map((listing) => (
                    <div key={listing._id} className="transform hover:scale-105 transition-transform duration-300">
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sale Listings */}
            {saleListing && saleListing.length > 0 && (
              <div className="group">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                  <div>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2'>
                      For Sale
                    </h2>
                    <p className="text-gray-600">Discover homes ready for purchase</p>
                  </div>
                  <Link 
                    className='text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition-colors duration-300 group-hover:gap-3' 
                    to={'/search?type=sale'}
                  >
                    View All Properties
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {saleListing.map((listing) => (
                    <div key={listing._id} className="transform hover:scale-105 transition-transform duration-300">
                      <ListingItem listing={listing} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who found their perfect home with DreamLine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Contact an Agent
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;