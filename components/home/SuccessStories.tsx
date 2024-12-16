export default function SuccessStories() {
  const stories = [
    {
      name: "Lakshmi SHG",
      location: "Tamil Nadu",
      quote: "Dehelp helped us access financial services we never had before. Our group has grown significantly since joining.",
      image: "https://t4.ftcdn.net/jpg/06/49/46/13/360_F_649461336_VeKRYlh3Snjq7BCWXOmbh1IirtmWM1H3.jpg"
    },
    {
      name: "Shakti Women's Group",
      location: "Maharashtra",
      quote: "The blockchain technology gave us transparency and trust in our operations. We've doubled our impact in just one year.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHyESz8fU4OXQIsmJz75Iw2nisy8i_yZD09g&s"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border">
              <div className="h-48 overflow-hidden">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <blockquote className="text-lg mb-4">&ldquo;{story.quote}&rdquo;</blockquote>
                <p className="font-bold">{story.name}</p>
                <p className="text-muted-foreground">{story.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}