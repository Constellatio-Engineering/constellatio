import { Flashcard } from "./Flashcard";

const flashcardData = [
  {
    answer: "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "IN 2 DAYS",
    id: "a",
    question: "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "upcoming" as const,
  },
  {
    answer: "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "TODAY",
    id: "b",
    question: "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "completed" as const,
  },
  {
    answer: "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "IN 2 DAYS",
    id: "c",
    question: "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "upcoming" as const,
  },
  {
    answer: "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "TODAY",
    id: "d",
    question: "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "completed" as const,
  }
];

export function FlashcardGrid() 
{
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashcardData.map((card) => (
          <Flashcard
            id={card.id}
            key={card.id}
            status={card.status}
            dueIn={card.dueIn}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </div>
    </div>
  );
}
