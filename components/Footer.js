"use client"
import React from "react";
import { useState,useEffect } from "react";

const Footer = () => {

return (
    <footer className="bg-[#141414] w-[98.5vw] text-white p-6 pt-10 mt-20">
        <div className="container mx-auto flex  justify-between items-center flex-col md:flex-row">
            <div className="info">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Communication Mastery. All rights
                    reserved.
                </p>
                <div className="mt-4 space-x-4">
                    <a href="/privacy" className="text-[#fca000] hover:text-gray-300">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-[#fca000] hover:text-gray-300">
                        Terms of Service
                    </a>
                </div>
            </div>
            <div className="socials flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <div
                        className="relative"
                        style={{ display: "inline-block" }}
                    >
                        <img
                            src={ "svgs/coloredig.svg"}
                            className={`h-8 cursor-pointer transition-all duration-300`}
                            alt=""
                        />
                    </div>
                    <a
                        target="_blank"
                        href="https://www.instagram.com/himeshvenk/"
                        className="text-[#fca000] hover:text-gray-300"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    </footer>
);
};

export default Footer;
