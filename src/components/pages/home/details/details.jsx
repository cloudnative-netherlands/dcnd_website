import React from 'react';

//import Link from 'components/shared/link';

//const TITLE = 'Hotel information';

const Details = () => (
  <section
    className="safe-paddings bg-white 2xl:pb-10 2xl:pt-0 md:pb-10 md:pt-0 sm:pb-10 sm:pt-0"
    style={{ paddingBottom: '93px' }}
  >
    <div className="container-md">
      <div className="2xl:mt-16 xl:mt-16 lg:mt-16 md:mt-16">
        <h2 className="mt-3 text-center text-6xl font-bold leading-tight text-primary-1">
          {/*   {TITLE}  */} Nearby Hotels
        </h2>
        <div>
          <div className="mx-auto mt-5 max-w-[800px] text-center text-lg leading-normal text-primary-1">
            <div className="mt-7 text-center">
              <p>
                <b>Hotel NH Utrecht</b> - Jaarbeursplein 24, 3521 AR Utrecht
              </p>
              <p>
                <b>Hampton by Hilton Utrecht Central Station</b> - Boven Catharijnepoort 4, 3511 WN Utrecht
              </p>
              <p>
                <b>Park Plaza Utrecht</b> - Westplein 50, 3531 BL Utrecht
              </p>
              <p>
                <b>The Anthony Hotel Utrecht</b> - Kanaalstraat 197-199, 3531 CG Utrecht
              </p>
              <p>
                <b>HInntel Hotels Utrecht Centre</b> - Smakkelaarshoek 24, 3511 EC Utrecht
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Details;
