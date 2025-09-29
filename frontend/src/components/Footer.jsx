import chefHatcolor from "../assets/chefHatcolor.webp";
import { Facebook, Github, Instagram, Linkedin, Menu, X } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center w-full bg-[#f7ecf0] text-[#293a4a] gap-5 py-8 px-5 border-t-3 border-[#293a4a] sm:flex-row justify-between sm:px-10 sm:py-10 md:px-20">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="pb-1.5 w-10 lg:w-14">
            <img src={chefHatcolor} alt="Logo" />
          </div>
          <div className="font-semibold dm-serif text-3xl lg:text-4xl">
            ChefAnia
          </div>
        </div>
        <p className="roboto text-sm lg:text-xl">
          Developed by{" "}
          <a
            className="italic font-bold text-[#b14c6c] dm-serif"
            href="https://anujprasad0.github.io/Portfolio"
            target="_blank"
          >
            Anuj Prasad
          </a>
          .
        </p>
      </div>
      <div className="flex items-center justify-around gap-4 md:gap-7">
        <a href="https://www.facebook.com/anujprasad65" target="_blank">
          <Facebook />
        </a>
        <a href="https://www.instagram.com/anujprasad0" target="_blank">
          <Instagram />
        </a>
        <a href="https://x.com/anujprasad0" target="_blank">
          <X />
        </a>
        <a href="https://github.com/AnujPrasad0" target="_blank">
          <Github />
        </a>
        <a href="https://www.linkedin.com/in/anujprasad0" target="_blank">
          <Linkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
