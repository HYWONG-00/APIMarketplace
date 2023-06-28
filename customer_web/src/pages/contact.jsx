import PageIllustration from "../components/page-illustration";

export default function Contact() {
    return (
        <section className="relative">
            <PageIllustration />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Page header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                        <h1 className="h1 mb-4" data-aos="fade-up">How can we help you?</h1>
                        <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">We have custom plans to power your business. Tell us your needs, and we'll contact you shortly.</p>
                    </div>

                    {/* Contact form */}
                    <form className="max-w-xl mx-auto">
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">Full Name <span className="text-red-600">*</span></label>
                                <input id="full-name" type="text" className="form-input w-full text-gray-300 bg-transparent" placeholder="Enter your full name" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                                <input id="email" type="email" className="form-input w-full text-gray-300 bg-transparent" placeholder="Enter your email address" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                                <input id="subject" type="text" className="form-input w-full text-gray-300 bg-transparent" placeholder="How can we help you?" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="message">Message</label>
                                <textarea id="message" rows={4} className="form-textarea w-full text-gray-300 bg-transparent" placeholder="Write your message"></textarea>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="flex items-center">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span className="text-gray-400 ml-2">I agree to the privacy policy</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mt-6">
                            <div className="w-full px-3">
                                <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Send</button>
                            </div>
                        </div>
                    </form>

                </div>
                <section>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">

                        {/* CTA box */}
                        <div className="bg-gray-800 py-10 px-8 md:py-16 md:px-12">
                            <div className="flex flex-col lg:flex-row justify-between items-center">

                                {/* CTA content */}
                                <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-3/4">
                                    <h3 className="h3 text-white mb-2">Just want to say hello?</h3>
                                    <p className="text-gray-400 text-lg">Drop us a line and we will get back to you shortly.</p>
                                </div>

                                {/* CTA button */}
                                <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
                                    <a className="btn text-white bg-purple-600 hover:bg-purple-700" href="#0">Contact us</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </section>
    )
}