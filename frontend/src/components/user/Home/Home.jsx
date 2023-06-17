import '@fortawesome/fontawesome-free/css/all.min.css';
import './home.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
function Home() {
    useEffect(() => {
        const mountainLeft = document.querySelector('#mountain_left');
        const mountainRight = document.querySelector('#mountain_right');
        const cloud1 = document.querySelector('#clouds_1');
        const cloud2 = document.querySelector('#clouds_2');
        const text = document.querySelector('#text');
        const man = document.querySelector('#man');

        window.addEventListener('scroll', () => {
            let value = scrollY;
            mountainLeft.style.left = `-${value / 0.7}px`
            cloud2.style.left = `-${value * 2}px`
            mountainRight.style.left = `${value / 0.7}px`
            cloud1.style.left = `${value * 2}px`
            text.style.bottom = `-${value}px`;
            man.style.height = `${window.innerHeight - value}px`
        })

    }, []);
    return (
        <div  className='home-body'>


            <div style={{all: 'unset'}} className='home-main'>
                <section id="top">
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/bg.jpg" id="bg" />
                    <h2 id="text">Mountains</h2>
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/man.png" id="man" />
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/clouds_1.png" id="clouds_1" />
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/clouds_2.png" id="clouds_2" />
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/mountain_left.png" id="mountain_left" />
                    <img src="https://aryan-tayal.github.io/Mountains-Parallax/mountain_right.png" id="mountain_right" />
                </section>
                <section id="sec">
                    <h2>Welcome to the Mountains</h2>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. A earum ipsam laboriosam mollitia, architecto esse voluptates eligendi provident soluta et cupiditate sit nisi at dolorum iure dignissimos cumque amet necessitatibus blanditiis? Earum assumenda soluta reiciendis recusandae, incidunt tenetur nihil adipisci corrupti, quibusdam ullam numquam iusto veritatis facilis ab dicta, nobis inventore eius magni eveniet quo? Repellat nobis quos, facilis quam perspiciatis asperiores delectus, aliquid nihil molestias in at modi nulla minima deleniti. Minima aliquid magnam libero reiciendis et, nesciunt repellendus eum vel rerum alias ea enim fugiat eius. Quae dolores, amet nam ab officiis corrupti sequi eligendi quo culpa illum.
                    </p>
                </section>
                <footer>
                    <a href=""><i className="fa-solid fa-house"></i></a>
                    <a href=""><i className="fa-solid fa-mountain-sun"></i></a>
                    <a href=""><i className="fa-solid fa-person-hiking"></i></a>
                    <a href=""><i className="fa-solid fa-people-group"></i></a>
                    <Link to='/profile'><i className="fa-solid fa-gears"></i></Link>
                    
                </footer>
            </div>
        </div>
        //js file add here how to 
    )
}

export default Home