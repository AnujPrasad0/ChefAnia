import { Leaf, Users, Clock, Wallet, Sparkles, Globe } from "lucide-react";

const WhyChefania = () => {
  const useCases = [
    {
      icon: <Leaf className="w-10 h-10 text-green-700" />,
      title: "Zero-Waste Cooking",
      desc: "Turn leftover ingredients into meals that taste amazing instead of letting them spoil.",
    },
    {
      icon: <Users className="w-10 h-10 text-orange-600" />,
      title: "Family Meals Made Easy",
      desc: "Enter what you already have and get recipes everyone at home can enjoy.",
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "Quick Fixes",
      desc: "Short on time? Get instant recipe ideas from what’s in your fridge.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-yellow-600" />,
      title: "Budget-Friendly",
      desc: "Save money by cooking with what you already own instead of overshopping.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-pink-600" />,
      title: "Creative Cooking",
      desc: "Discover fun new recipes you wouldn’t have thought of with simple ingredients.",
    },
    {
      icon: <Globe className="w-10 h-10 text-purple-700" />,
      title: "Eco-Friendly",
      desc: "Reduce food waste and contribute to a more sustainable, greener world.",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-[#f7ecf0] px-5 py-15 gap-12 rounded-t-3xl md:rounded-t-5xl">
      {/* Section Heading */}
      <div className="flex flex-col items-center gap-4 text-center max-w-150">
        <h1 className="text-[#293a4a] text-4xl sm:text-6xl lg:text-7xl dm-serif">
          Why ChefAnia?
        </h1>
        <p className="text-[#293a4a] text-base sm:text-xl lg:text-2xl roboto">
          Smarter cooking, less waste, and more delicious meals with what you
          already have.
        </p>
      </div>

      {/* Use Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-250 px-3 sm:px-6 lg:px-12">
        {useCases.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 bg-white p-6 rounded-3xl border-2 border-[#293a4a] shadow-md hover:shadow-lg transition-all"
          >
            <div className="p-3 rounded-full bg-[#f7ecf0]">{item.icon}</div>
            <h2 className="dm-serif text-2xl text-[#293a4a] text-center">
              {item.title}
            </h2>
            <p className="roboto text-[#293a4a] text-center sm:text-lg">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Highlight card */}
      <div className="bg-linear-to-r from-[#b14c6c] to-[#66435b] text-white rounded-3xl px-6 py-8 text-center max-w-160">
        <h3 className="dm-serif text-2xl sm:text-3xl lg:text-4xl mb-3">
          Did You Know?
        </h3>
        <p className="roboto sm:text-lg lg:text-xl">
          1/3 of all food is wasted globally. With Chefania, you can help reduce
          food waste while discovering tasty recipes.
        </p>
      </div>
    </div>
  );
};

export default WhyChefania;
