import { AccordionItem } from '@/features/interview';
import { INTERVIEW_DATA } from '@/shared/constants';

export default function InterviewSection() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {INTERVIEW_DATA.map((item, index) => (
        <div
          key={index}
          id={`interview-q-${index}`}
          className="rounded-xl border border-gray-200 p-6 shadow-sm"
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
  );
}
