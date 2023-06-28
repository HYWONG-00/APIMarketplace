import { Link } from 'react-router-dom'

import PageIllustration from "../components/page-illustration";

const Cancel = () => {
    return (
        <section className="relative">
            <PageIllustration />
                    <section className="relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                                <div className="max-w-3xl mx-auto text-center">
                                    {/* Top image */}
                                    <div className="relative inline-flex flex-col mb-6 bg-transparent" data-aos="fade-up">
                                        <img src={'https://mardizu.co.id/assets/asset_admin/img/illustration/warning.png'} width={300} height={300} />
                                        
                                    </div>
                                    {/* Content */}
                                    <h1 className="h1 mb-4" data-aos="fade-up" data-aos-delay="200">Uh oh. Your payment has been canceled.</h1>
                                    <p className="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="400">Head to our <Link to="/marketplace" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">marketplace</Link> to discover more APIs to subscribe from.</p>
                                </div>
                            </div>
                        </div>
                    </section>

        </section>

    )
}

export default Cancel;