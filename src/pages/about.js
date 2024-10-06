import Nav from "../components/Nav";
import chaconImage from '../IMGS/CHACON2.jpg';

const About = () => {
    return (
        <div className='flex justify-center items-center'>
            <Nav />
            <div
                style={{
                    backgroundImage: "url('https://i2.wp.com/www.knoxalliance.store/wp-content/uploads/2017/05/light-color-background-images-for-website-top-hd-images-for-free-background-for-website-in-light-color-1-1024x640.jpg?ssl=1')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    padding: "20px",
                    overflow: "hidden",
                    textAlign: "left" // Aligns text to the left
                }}>
                    <div
                style={{
                    textAlign: "center" // Aligns text to the left
                }}>
                <h1>About the application</h1>

                <p>
                    The following program consists of showing the <br />
                    data recovered from the Landsat satellite which is one of the longest continuous datasets <br />
                    of measurements of Earth’s surface. The program allows the user to choose a specific <br />
                    location in which it will be compared with the Landsat satellite data. Depending on the <br />
                    location chosen by the user, the program will also return when the satellite
                </p>

                <h2>Integrantes</h2>
                </div>
                <div style={{
  fontSize: "25px",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
}}>
                <div className="flex items-start flex-wrap">
                    <div className="flex flex-col items-center mx-2">
                        <div>Alvaro</div>
                        <img src='ALVARO.JPG' alt="" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <div>Chacon</div>
                        <img src={chaconImage} alt="Ch" style={{ width: '100px', height: 'auto' }}  />
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <div>Oscar</div>
                        <img src='OSCAR.JPG' alt="" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <div>Juan Pablo</div>
                        <img src='JUAN.JPG' alt="" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    <div className="flex flex-col items-center mx-2">
                        <div>Cesar</div>
                        <img src='CESAR.JPG' alt="" style={{ width: '100px', height: 'auto' }} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;