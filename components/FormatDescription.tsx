export function FormatDescription({ description }: { description: string }) {
    // Chia chuỗi description thành các đoạn nhỏ
    const formatDescription = (desc: string) => {
      const parts = desc.split(/(?<=\.)/); // Tách theo dấu "."
      let result = [];
      let temp = "";

      for (let i = 0; i < parts.length; i++) {
        temp += parts[i];
        if ((i + 1) % 3 === 0 || i === parts.length - 1) {
          result.push(temp.trim());
          temp = "";
        }
      }

      return result;
    };

    const formattedDescription = formatDescription(description);

    return (
      <div className="text-justify">
        {formattedDescription.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }