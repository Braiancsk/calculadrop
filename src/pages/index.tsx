import Image from "next/image";
import { Inter } from "next/font/google";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useState } from "react";
import { Input } from "@/components/Input";
import { CgMathPercent, CgMathPlus } from "react-icons/cg";
import { currencyFormat } from "@/utils/currencyFormater";
import { ResultCard } from "@/components/ResultCard";

const inter = Inter({ subsets: ["latin"] });

interface InputValuesTypes {
  product_price: number;
  shipping: number;
  checkout: number;
  charge_back: number;
  taxes: number;
  marketing: number;
  gateway: number;
  markup: number;
  profit_meta:number;
}

export default function Home() {
  const [values, setValues] = useState<InputValuesTypes>({
    product_price: 0,
    shipping: 0,
    checkout: 0,
    charge_back: 0,
    taxes: 0,
    marketing: 0,
    gateway: 0,
    markup: 0,
    profit_meta:0
  });

  function handleInputChange({ name, value }: { name: string; value: string }) {
    console.log(value)
    setValues((prevInputValues) => {
      if(!value && typeof value === 'string'){
        return{
          ...prevInputValues,
          [name]:0
        }
      }

      return {
          ...prevInputValues,
          [name]:
            typeof value === "number"
              ? parseFloat(value)
              : value?.replace(",", "."),
        }
      

    })
  }

  function calculateTotalCost(): number {
    const { product_price, markup } = values;

    // calcula o preço final do produto com base nas taxas, despesas e markup
    const totalPrice = +product_price * markup;

    return totalPrice;
  }

  function calculateProfit(): number {
    const {
      product_price,
      shipping,
      checkout,
      charge_back,
      taxes,
      marketing,
      gateway,
      markup,
    } = values;

    // calcula o preço final do produto com base nas taxas, despesas e markup
    const totalPrice = product_price * markup;

    // converte as taxas e despesas em valores monetários
    const checkoutFee = checkout !== 0 ? totalPrice * (checkout / 100) : 0;
    const chargeBackFee =
      charge_back !== 0 ? totalPrice * (charge_back / 100) : 0;
    const taxesValue = taxes !== 0 ? totalPrice * (taxes / 100) : 0;
    const gatewayFee = gateway !== 0 ? totalPrice * (gateway / 100) : 0;
    const shippingFee = shipping ? +shipping : 0
    const marketingFee = marketing ? +marketing : 0

    // calcula o custo total das taxas e despesas
    const totalFees =
      shippingFee +
      +marketingFee +
      +checkoutFee +
      +chargeBackFee +
      +taxesValue +
      +gatewayFee;

  
    // calcula o lucro por cada venda
    const profit = totalPrice - product_price - totalFees;
    return profit;
  }

  function profitPercentage() {
    const totalPrice = calculateTotalCost();
    const profit = calculateProfit();

    const profitMargin = (profit / totalPrice) * 100;
    // arredonda o resultado para no máximo 2 casas decimais
    const profitMarginRounded = Number(profitMargin.toFixed(2));

    if (profitMarginRounded === -Infinity) return 0;
    return profitMarginRounded;
  }

  function calculateBreakEven() {
    const profitMargin = calculateProfit();
    const {
      product_price,
      shipping,
      checkout,
      charge_back,
      taxes,
      marketing,
      gateway,
      markup,
    } = values;

    // calcula o preço final do produto com base nas taxas, despesas e markup
    const totalPrice = product_price * markup;

    // converte as taxas e despesas em valores monetários
    const checkoutFee = checkout !== 0 ? totalPrice * (checkout / 100) : 0;
    const chargeBackFee =
      charge_back !== 0 ? totalPrice * (charge_back / 100) : 0;
    const taxesValue = taxes !== 0 ? totalPrice * (taxes / 100) : 0;
    const gatewayFee = gateway !== 0 ? totalPrice * (gateway / 100) : 0;
    const marketingFee = marketing ? +marketing : 0
    const shippingFee = shipping ? +shipping : 0

    // calcula o custo total das taxas e despesas
    const totalFees =
    shippingFee +
      marketingFee +
      +checkoutFee +
      +chargeBackFee +
      +taxesValue +
      +gatewayFee;

    console.log(totalFees);
    const breakeven = totalFees + profitMargin - shippingFee
    return breakeven;
  }

  function calculatePageView() {
    const profitMargin = calculateProfit();
    const halfProfitMargin = profitMargin / 2;
    const idealPageView = halfProfitMargin / 100;
    return idealPageView;
  }

  function calculateCPA() {
    const pageViewCost = calculatePageView()
    const pageViewFee = pageViewCost * 100
    return pageViewFee
  }

  function calculateEstimatedSales(profit_meta_days:number){
    const {profit_meta} = values
    const productSellCost = calculateTotalCost()
    const profit = calculateProfit()
      // calcula o número de vendas diárias necessárias para atingir a meta de faturamento
    const dailySales = profit_meta / profit;
    const dailySellsTotal = dailySales * productSellCost / profit_meta_days
    console.log(dailySales)

    return dailySellsTotal
  }

  function calculateSellsQuantity(profit_meta_days:number){
    const {profit_meta} = values
    const productSellCost = calculateTotalCost()
    const profit = calculateProfit()
      // calcula o número de vendas diárias necessárias para atingir a meta de faturamento
      const dailySales = profit_meta / profit / profit_meta_days
      console.log(dailySales)
    return Math.round(dailySales)
  }

  function calculateMarketingCost(profit_meta_days:number): number {
    const {marketing} = values


    const profit = calculateProfit()
      // calcula o número de vendas diárias necessárias para atingir a meta de faturamento
      const estimatedSalesProfit = calculateEstimatedSales(profit_meta_days)
      
      // calcula o custo diário de marketing
        const marketingCost = estimatedSalesProfit * (marketing / 100)

        return marketingCost;

     
  }

  return (
    <main className="bg-primary min-h-screen py-5">
      <header className="py-6">
        <h1 className="text-white text-3xl text-center">
          Calcula<b>Drop</b>
        </h1>
      </header>

      <section className="container py-7 text-white max-w-[90%]">
        <h1 className="text-3xl">
          Calcule seu ganho estimado na sua operação de Dropshipping
        </h1>
        <p className="mt-3">
          Faça uma estimativa rápida do quanto você pode ganhar com um produto.
          Explorando diferentes tipos de cenários e variáveis
        </p>
      </section>

      <div className="bg-dark shadow-md rounded-lg max-w-[90%] mx-auto">
        <section className="container p-7">
          <h1 className="text-white text-2xl">Custo geral</h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            <CurrencyInput
              label="Custo do produto"
              tooltipId="product_price_input"
              tooltipMessage="Esse é o preço pelo qual você vai comprar o produto no seu fornecedor"
              id="product-price"
              name="product_price"
              onChange={(value, name) =>
                handleInputChange({ value, name } as {
                  value: string;
                  name: string;
                })
              }
            />

            <Input
              label="Markup"
              id="markup"
              name="markup"
              type="text"
              placeholder="Ex: 2.5"
              onChange={({ target }) =>
                handleInputChange({ value: target.value, name: target.name })
              }
              adornment={
                <CgMathPlus
                  className="absolute right-2 top-[11px] rotate-[45deg]"
                  size={25}
                  color="#393646"
                />
              }
            />

            <CurrencyInput
              label="Frete"
              id="shipping"
              name="shipping"
              tooltipId="shipping"
              tooltipMessage="Esse é o preço do frete do produto. É sempre aconselhável inserir o custo do produto junto com o frete. Assim você consegue entender melhor o cálculo geral"
              onChange={(value, name) =>
                handleInputChange({ value, name } as {
                  value: string;
                  name: string;
                })
              }
            />

          <CurrencyInput
              label="CPA"
              id="marketing"
              name="marketing"
              tooltipId="shipping"
              tooltipMessage="Esse é o custo que você está tendo para fazer uma venda. Ele será usado para calcular o seu lucro final"
              onChange={(value, name) =>
                handleInputChange({ value, name } as {
                  value: string;
                  name: string;
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            <Input
              label="Imposto"
              id="taxes"
              name="taxes"
              type="text"
              placeholder="Ex: 6"
              onChange={({ target }) =>
                handleInputChange({ value: target.value, name: target.name })
              }
              adornment={
                <CgMathPercent
                  className="absolute right-2 top-[11px]"
                  size={25}
                  color="#393646"
                />
              }
            />
            <Input
              label="Gateway"
              id="gateway"
              name="gateway"
              type="text"
              placeholder="Ex: 2.5"
          
              onChange={({ target }) =>
                handleInputChange({ value: target.value, name: target.name })
              }
              adornment={
                <CgMathPercent
                  className="absolute right-2 top-[11px]"
                  size={25}
                  color="#393646"
                />
              }
            />

            <Input
              label="Checkout"
              id="checkout"
              name="checkout"
              type="text"
          
              placeholder="Ex: 2.5"
              onChange={({ target }) =>
                handleInputChange({ value: target.value, name: target.name })
              }
              adornment={
                <CgMathPercent
                  className="absolute right-2 top-[11px]"
                  size={25}
                  color="#393646"
                />
              }
            />

            <Input
              label="Charge back"
              id="charge_back"
              name="charge_back"
              type="text"
              placeholder="Ex: 3"
         
              onChange={({ target }) =>
                handleInputChange({ value: target.value, name: target.name })
              }
              adornment={
                <CgMathPercent
                  className="absolute right-2 top-[11px]"
                  size={25}
                  color="#393646"
                />
              }
            />
          </div>
        </section>

        <section className="container p-7">
          <h1 className="text-white text-2xl mb-10">Resultado do produto</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <ResultCard
              title="Custo do produto"
              value={values.product_price}
              tooltipId="product_price"
              tooltipMessage="Esse é o preço pelo qual você vai comprar o produto no seu fornecedor"
            />

            <ResultCard
              title="Markup"
              type="suffix"
              suffix="x"
              value={values.markup}
              tooltipId="markup"
              tooltipMessage="Esse será o seu markup, ou seja, você vai vender o produto por x vezes o valor de compra do mesmo"
            />

            <ResultCard
              title="Preço de venda"
              value={calculateTotalCost()}
              tooltipId="selling_price"
              tooltipMessage="Este será o preço final do seu produto"
            />

            <ResultCard
              title="Porcentagem de lucro"
              value={profitPercentage()}
              type="suffix"
              suffix="%"
              tooltipId="percentage_profit"
              tooltipMessage="Essa será a porcentagem de lucro estimada do seu produto"
            />

            <ResultCard
              title="Lucro por venda"
              value={calculateProfit()}
              tooltipId="profit_sell"
              tooltipMessage="Lucro para cada venda realizada do produto"
            />

            <ResultCard
              title="Breakeven"
              value={calculateBreakEven()}
              tooltipId="breakeven"
              tooltipMessage="Esse é o valor máximo que você pode gastar para fazer uma venda. Aonde não vai ter lucro e nem prejuízo, ou seja, 0 a 0"
            />
          </div>
        </section>

     

        <section className="container p-7">
          <h1 className="text-white text-2xl mb-10">Meta de lucro</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <CurrencyInput
              label="Quanto você deseja lucrar?"
              id="profit-meta"
              name="profit_meta"
              tooltipId="profit_meta"
              tooltipMessage="Esse é o seu objetivo de lucro. Já descontando todas as taxas e custos"
              onChange={(value, name) =>
                handleInputChange({ value, name } as {
                  value: string;
                  name: string;
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-7">
            <ResultCard
              title="Vendas diarias"
              value={calculateEstimatedSales(30)}
              tooltipId="daily_sales"
              tooltipMessage="Essa é a quantidade de vendas diárias que você vai precisar fazer para alcançar a sua meta"
            />
            <ResultCard
              title="Vendas semanais"
              value={calculateEstimatedSales(4)}
              tooltipId="weekly_sales"
              tooltipMessage="Essa é a quantidade de vendas semanais que você vai precisar fazer para alcançar a sua meta"
            />
            <ResultCard
              title="Vendas mensais"
              value={calculateEstimatedSales(1)}
              tooltipId="weekly_sales"
              tooltipMessage="Essa é a quantidade de vendas mensais que você vai precisar fazer para alcançar a sua meta"
            />
            <ResultCard
              title="Quantidade de vendas"
              value={calculateSellsQuantity(1)}
              type="suffix"
              suffix=" vendas"
              tooltipId="daily_marketing"
              tooltipMessage="Essa é a quantidade de vendas totais que você vai precisar realizar"
            />
        
        <ResultCard
              title="Marketing diário"
              value={calculateMarketingCost(30)}
              tooltipId="daily_marketing"
              tooltipMessage="Você vai precisar gastar esse valor diariamente em marketing para conseguir alcançar sua meta"
            />
            <ResultCard
              title="Marketing mensal"
              value={calculateMarketingCost(1)}
              tooltipId="monthly_marketing"
              tooltipMessage="Você vai precisar gastar esse valor mensalmente em marketing para conseguir alcançar sua meta"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
