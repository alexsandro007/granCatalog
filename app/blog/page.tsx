import { title } from "@/components/primitives";
import {Button} from '@heroui/button';

export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={title()}>Blog</h1>
      <Button className="mt-10" color="primary">Button</Button>
    </div>
  );
}
