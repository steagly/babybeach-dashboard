import Header from "./Header";
import styles from "./Cards.module.css";

export default function Cards() {
  const cards = [
    {
      id: 1,
      owner: "Marina Feloy",
      type: "1 Adult 2 Kids",
      status: true,
      visits: 6,
      visitCap: 12,
      price: "72,50 Euro",
      createdAt: "13/07/2024",
    },
    {
      id: 2,
      owner: "Lisaveta Koi",
      type: "2 Adult 1 Kids",
      status: true,
      visits: 6,
      visitCap: 12,
      price: "72,50 Euro",
      createdAt: "13/07/2024",
    },
    {
      id: 3,
      owner: "Herman Feloy",
      type: "1 Adult 2 Kids",
      status: false,
      visits: 6,
      visitCap: 12,
      price: "72,50 Euro",
      createdAt: "13/07/2024",
    },
    {
      id: 4,
      owner: "Marina Feloy",
      type: "1 Adult 2 Kids",
      status: true,
      visits: 6,
      visitCap: 12,
      price: "72,50 Euro",
      createdAt: "13/07/2024",
    },
    {
      id: 5,
      owner: "Marina Feloy",
      type: "1 Adult 2 Kids",
      status: false,
      visits: 6,
      visitCap: 12,
      price: "72,50 Euro",
      createdAt: "13/07/2024",
    },
  ];
  return (
    <>
      <Header sectionName={"Cards"} />
      <div className={styles.cards_container}>
        {cards.map((card) => (
          <div>{card.owner}</div>
        ))}
      </div>
    </>
  );
}
