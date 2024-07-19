"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

// TODO: THIS SHOLD BE GOTTEN FROM THE DB
const testimonials = [
  {
    name: "Scott",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    title: "Software Engineer",
    description: "This is the best AI application I've used!",
  },
  {
    name: "Emily",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    title: "Product Manager",
    description:
      "Incredible tool! It has streamlined our workflow significantly.",
  },
  {
    name: "Michael",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    title: "Data Scientist",
    description: "The accuracy and speed are unmatched. Highly recommend!",
  },
  {
    name: "Sarah",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    title: "UX Designer",
    description: "User-friendly and highly effective. A game changer!",
  },
  {
    name: "David",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "DevOps Engineer",
    description: "Excellent performance and easy to integrate.",
  },
  {
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    title: "Tech Lead",
    description: "A powerful tool that has greatly enhanced our projects.",
  },
  {
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    title: "Teacher",
    description: "Efficient and reliable. My students love using it!",
  },
  {
    name: "Isabella",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    title: "Marketing Specialist",
    description:
      "Fantastic application with great support. It boosted our campaigns!",
  },
  {
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "CTO",
    description: "Innovative and robust. It exceeded our expectations!",
  },
  {
    name: "Olivia",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    title: "Freelance Writer",
    description: "Reliable and easy to use. It helps me write better content.",
  },
  {
    name: "Daniel",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "Graphic Designer",
    description: "A creative boost! It has improved my design process.",
  },
  {
    name: "Mia",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "HR Manager",
    description:
      "Great tool for enhancing team productivity and collaboration.",
  },

  {
    name: "David",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "DevOps Engineer",
    description: "Excellent performance and easy to integrate.",
  },
  {
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    title: "Tech Lead",
    description: "A powerful tool that has greatly enhanced our projects.",
  },
  {
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    title: "Teacher",
    description: "Efficient and reliable. My students love using it!",
  },
  {
    name: "Isabella",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    title: "Marketing Specialist",
    description:
      "Fantastic application with great support. It boosted our campaigns!",
  },
  {
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "CTO",
    description: "Innovative and robust. It exceeded our expectations!",
  },

  {
    name: "David",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "DevOps Engineer",
    description: "Excellent performance and easy to integrate.",
  },
  {
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    title: "Tech Lead",
    description: "A powerful tool that has greatly enhanced our projects.",
  },
  {
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    title: "Teacher",
    description: "Efficient and reliable. My students love using it!",
  },
  {
    name: "Isabella",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    title: "Marketing Specialist",
    description:
      "Fantastic application with great support. It boosted our campaigns!",
  },
  {
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "CTO",
    description: "Innovative and robust. It exceeded our expectations!",
  },

  {
    name: "David",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "DevOps Engineer",
    description: "Excellent performance and easy to integrate.",
  },
  {
    name: "Sophia",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    title: "Tech Lead",
    description: "A powerful tool that has greatly enhanced our projects.",
  },
  {
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    title: "Teacher",
    description: "Efficient and reliable. My students love using it!",
  },
  {
    name: "Isabella",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    title: "Marketing Specialist",
    description:
      "Fantastic application with great support. It boosted our campaigns!",
  },
  {
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "CTO",
    description: "Innovative and robust. It exceeded our expectations!",
  },
];

const LandingContent = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="mx-5 md:mx-10 relative ">
      <h2 className="text-center text-4xl font-extrabold mb-10">
        Testimonaials
      </h2>
      <h2 className="sr-only">Testimonials</h2>
      <div
        className={cn(
          `grid grid-cols-1 gap-3 lg:gap-5 sm:grid-cols-2 lg:grid-cols-3 `,
          showMore ? "max-h-full" : "max-h-[33rem] overflow-hidden"
        )}
      >
        {testimonials.map((testimony) => (
          <Card
            key={testimony.description}
            className=" bg-slate-200 dark:bg-[#192339]  border-none "
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={testimony.avatar} alt={testimony.name} />
                  <AvatarFallback>{testimony.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg"> {testimony.name}</p>
                  <p className=" text-muted-foreground tracking-wide text-xs mt-0.5">
                    {testimony.title}
                  </p>
                </div>
              </CardTitle>

              <CardContent className="pt-2 px-0">
                {testimony.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
      {!showMore && (
        <div className=" inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-[#030712] absolute">
          <Button
            type="button"
            // variant="secondary"
            onClick={handleShowMore}
            variant="sponsor"
            className="relative pointer-events-auto text-xs md:text-sm"
          >
            {showMore ? "Okay, I get the point" : "Show more..."}
          </Button>
        </div>
      )}

      {showMore && (
        <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-10 pointer-events-none dark:from-[#030712]  sticky -mt-52 transition-opacity duration-300 opacity-100">
          <Button
            onClick={handleShowMore}
            type="button"
            variant="sponsor"
            className="relative pointer-events-auto text-xs md:text-sm transition-transform translate-y-4"
          >
            Okay, I get the point
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingContent;
