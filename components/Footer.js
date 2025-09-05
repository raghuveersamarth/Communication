"use client"
import React from "react";
import { useState,useEffect } from "react";

const Footer = () => {

return (
    <footer className="bg-[#141414] w-full text-white p-4 pt-8 mt-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="info text-center md:text-left">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Communication Mastery. All rights reserved.
                </p>
                <div className="mt-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center md:items-start">
                    <a href="/privacy-policy" className="text-[#fca000] hover:text-gray-300">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-[#fca000] hover:text-gray-300">
                        Terms of Service
                    </a>
                </div>
            </div>
            <div className="socials flex flex-col gap-3 items-center md:items-end">
                <div className="flex gap-3 items-center">
                    <div className="relative inline-block">
                        <img
                            src={"svgs/coloredig.svg"}
                            className="h-8 cursor-pointer transition-all duration-300"
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
