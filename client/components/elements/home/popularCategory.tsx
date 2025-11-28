import Image from "next/image";
import Link from "next/link";

const categoryItems = [
  {
    id: 1,
    path: "processor",
    name: "Processor",
    image: "/p1.jpg",
  },
  {
    id: 2,
    path: "storage",
    name: "RAM / SSD",
    image: "/p2.jpg",
  },
  {
    id: 7,
    path: "motherboard",
    name: "Motherboard",
    image: "/p9.jpg",
  },
  {
    id: 3,
    path: "storage",
    name: "Graphics Card",
    image: "/p3.jpg",
  },
  {
    id: 4,
    path: "cabinate",
    name: "Cabinate",
    image: "/p4.jpg",
  },
  {
    id: 5,
    path: "ups",
    name: "UPS / Power backup",
    image: "/p5.jpg",
  },
  {
    id: 6,
    path: "monitor",
    name: "Monitor",
    image: "/p8.jpg",
  },
];

export const PopularCategory = () => {
  return (
    <div className="app_categories_cover">
      <h3>Popular Categories</h3>
      <div className="app_category_list_items">
        <ul>
          {categoryItems.map((item) => (
            <li key={item.id}>
              <Link href={item.path}>
                <figure>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                  />
                </figure>
                <h4>{item.name}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
