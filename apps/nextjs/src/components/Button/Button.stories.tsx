import Image from "next/image";
import { Button } from "antd";

export const Default = () => {
  return (
    <div>
      <div className="flex gap-x-4">
        <Button type="primary">Hello</Button>
        <Button type="primary" danger>
          World
        </Button>
        <Button type="dashed">World</Button>
      </div>

      <div className="relative mt-10 h-20 w-20">
        <Image alt="Github" src="/github-icon.png" fill />
      </div>
    </div>
  );
};
