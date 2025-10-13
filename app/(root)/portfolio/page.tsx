import React from "react";
import portfolio from "@/app/portfolio.json";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string[];
  link: string;
}

const page = () => {
  return (
    <div className="min-h-screen lg:py-12 pt-48 space-y-11 mx-[12%]">
      <div className="flex flex-col justify-center items-center gap-5 text-center">
        <p className="text-redOrange text-MobileHeader5 md:text-Header5 font-Header5">
          My Works
        </p>
        <p className="text-white text-MobileHeader2 md:text-Header2 md:font-Header2 font-MobileHeader2">Portfolio</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {portfolio.map((project: Project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

            {project.description.length > 0 ? (
              <ul className="text-sm space-y-2 mb-4">
                {project.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-nevada italic mb-4">
                No description available.
              </p>
            )}

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-center bg-redOrange text-white py-2 hover:bg-white hover:text-black hover:outline-2 transition duration-75"
            >
              Visit Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
