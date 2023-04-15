import Image from 'next/image'
import { Inter } from 'next/font/google'
import { CurrencyInput } from '@/components/CurrencyInput'
import { useForm,Controller } from 'react-hook-form';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      product_price: '',
    }
  });

  return (
    <main className='bg-dark min-h-screen'>
        <header className='py-6'>
        <h1 className='text-white text-3xl text-center'>Calcula<b>Drop</b></h1>
        </header>

        <section className='container p-7'>
            <h1 className='text-white text-2xl'>Preço do produto</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            <div className='flex flex-col gap-1 text-white'>
              <label htmlFor='product-price'>Preço do produto</label>
              <Controller
                name="product_price"
                control={control}
                render={({ field }:any) =>  <CurrencyInput id="product-price" {...field}/>}
              />

             
              </div>
            </div>
        </section>
      </main>
  )
}
