import Link from "next/link";

const Offers = () => {
  return (
    <div className="my-5">
      <div className="bg-gray-50 p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-blue-700">
            Flat 25% OFF on Your First Meds Order
          </h1>
          <p className="text-lg text-gray-500">
            Plus Up to 10% NMS Cash! Valid till 31st May 2025
          </p>
        </div>

        <div className="mb-6 bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600">
            How to Get It?
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Use code <span className="font-bold">NMSNEW</span> at checkout for
              25% OFF (max discount Rs. 700).
            </li>
            <li>
              Get up to 10% NMS Cash (max cashback Rs. 150) upon delivery of
              prepaid orders.
            </li>
            <li>
              Minimum order value of Rs. 1499 required to avail the discount and
              cashback.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Eligibility</h2>
          <ul className="list-inside text-gray-700">
            <li>
              Offer valid only for new customers placing their first medicine
              order.
            </li>
            <li>
              Coupon code <span className="font-bold">NMSNEW</span> is for
              first-time orders only and cannot be combined with selected
              evoucher codes.
            </li>
            <li>Order must be prepaid to qualify for the NMS Cash cashback.</li>
          </ul>
        </div>

        <div className="mb-6 bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-600">
            Important Notes
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Offer not valid on Ayurvedic, OTC, or FMCG products.</li>
            <li>If you cancel your order, the offer will be null and void.</li>
            <li>
              The maximum cashback of 10% is capped at Rs. 150 per transaction.
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-300">
          <h2 className="text-xl font-semibold text-green-700">
            How to Redeem NMS Cash
          </h2>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Add your desired medicines to the cart.</li>
            <li>
              At checkout, select `&quot`NMS Cash `&quot` to apply your
              cashback.
            </li>
            <li>Complete the payment and get the discount.</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/shop"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
          >
            Shop Now & Save 25%
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offers;
