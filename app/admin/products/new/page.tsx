import AddProductForm from '@/components/products/AddProductForm';
import ProductForm from '@/components/products/ProductForm';
import Heading from '@/components/ui/Heading';

export default function page(): JSX.Element {
  return (
    <>
      <Heading>Nuevo producto</Heading>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}
