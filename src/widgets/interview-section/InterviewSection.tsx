import { AccordionItem } from "@/features/interview";
import { INTERVIEW_DATA } from "@/shared/constants";

export default function InterviewSection() {
  return (
    <div>
      <h1 className="mt-4 text-center text-xl font-bold text-gray-600 md:mt-10 md:text-3xl">
        Frontend Interview Questions!
      </h1>

      <div className="mt-4 flex flex-col gap-4 p-4 md:mt-6 md:gap-8 md:p-8">
        {INTERVIEW_DATA.map((item, index) => (
          <div
            key={index}
            id={`interview-q-${index}`}
            className="rounded-lg border border-gray-200 p-4 shadow-sm md:rounded-xl md:p-6"
          >
            <AccordionItem question={item.question} answer={item.answer}>
              {item.children.length > 0 && (
                <div className="flex flex-col gap-1 border-t border-gray-100 pt-2">
                  {item.children.map((child, childIndex) => (
                    <AccordionItem
                      key={childIndex}
                      question={child.question}
                      answer={child.answer}
                      isChild
                    />
                  ))}
                </div>
              )}
            </AccordionItem>
          </div>
        ))}
      </div>
    </div>
  );
}
