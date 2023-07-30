import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer pt-20 p-10 bg-black text-white">
      <div>
        <h1 className="text-3xl font-bold">GameGenius Institute</h1>
        <p>Dhaka, Bangladesh</p>
        <div className="text-center font-semibold text-2xl text-purple-800" id="typewriter"></div>
      </div>
      <div>
        <span className="footer-title">Courses</span>
        <a className="link link-hover">Game Development</a>
        <a className="link link-hover">Game Design</a>
        <a className="link link-hover">Game Art</a>
        <a className="link link-hover">Game Marketing</a>
      </div>
      <div>
        <span className="footer-title">About Us</span>
        <a className="link link-hover">Mission</a>
        <a className="link link-hover">Team</a>
        <a className="link link-hover">Testimonials</a>
        <a className="link link-hover">Blog</a>
      </div>
      <div>
        <span className="footer-title">Policies</span>
        <a className="link link-hover">Terms of Service</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">Cookie Policy</a>
      </div>
      <div>
        <span className="footer-title">Connect with Us</span>
        <div className="flex gap-5">
          <a className="link link-hover">
            <FaFacebook className="w-8 h-8"></FaFacebook>
          </a>
          <a className="link link-hover">
            <FaYoutube className="w-8 h-8"></FaYoutube>
          </a>
          <a className="link link-hover">
            <FaInstagram className="w-8 h-8"></FaInstagram>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
