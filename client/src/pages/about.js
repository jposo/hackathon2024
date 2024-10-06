import Nav from "../components/Nav";
import "./about.css";

const About = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Nav />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">About Our Space Apps Team</h1>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Project</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our program showcases data from the Landsat satellite, one of the longest continuous datasets of Earth's surface measurements. Users can select specific locations to compare with Landsat data and receive predictions of satellite passes over those coordinates. This integration of real-time satellite data promotes spatial thinking, enabling students, researchers, and enthusiasts to explore Earth's surface changes.
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Interactive location selection</li>
                            <li>Comparison with historical Landsat data</li>
                            <li>Real-time satellite pass predictions</li>
                            <li>Visualization of Earth's surface changes</li>
                            <li>Educational resources for spatial thinking</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Our Team</h2>
                        <div className="flex justify-center mb-6">
                            <img 
                                src="https://scontent.ftij2-1.fna.fbcdn.net/v/t39.30808-6/462214614_122102421980555588_4054262581870423145_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=gQtj9mEnhJ0Q7kNvgEFmJYb&_nc_ht=scontent.ftij2-1.fna&_nc_gid=AjsNCXgnk41ab_o0TVSOl1_&oh=00_AYAH9VoP6qmKC1leure5upt72bhXWBEPt18dvlC8NMvjww&oe=6708A1B8" 
                                alt="Space Apps Team" 
                                className="w-full max-w-2xl rounded-lg shadow-md"
                            />
                        </div>
                        <p className="text-center text-gray-600">
                            From left to right: Oscar Mendivil, Alvaro Cruz, César Aguirre, Juan Osornio and Luis Chacon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;