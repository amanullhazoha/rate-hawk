const MetaPolicySection = ({ metapolicy_struct }) => {
    console.log(metapolicy_struct)

    return (
        <div className="px-4 md:px-8 py-6 md:py-8 border border-border-primary rounded-[20px] mb-8">
            <div>
                <h3 className="text-2xl font-semibold text-black">Policies</h3>

                <p className="w-14 h-[1px] bg-border-primary mt-8 mb-8"></p>
            </div>

            <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {metapolicy_struct?.children?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Children</h4>

                            <ul>
                                {metapolicy_struct.children.map((child, index) => (
                                    <li key={index}>
                                        <p>Age: {child.age_start} - {child.age_end}</p>
                                        <p>Price: {child.price} {child.currency || 'N/A'} (Extra bed: {child.extra_bed})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.children_meal?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Children Meal</h4>

                            <ul>
                                {metapolicy_struct.children_meal.map((meal, index) => (
                                    <li key={index}>
                                        <p>Age: {meal.age_start} - {meal.age_end}</p>
                                        <p>Inclusion: {meal.inclusion} {meal.currency || 'N/A'} ({meal.meal_type})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.cot?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Cots</h4>

                            <ul>
                                {metapolicy_struct.cot.map((cot, index) => (
                                    <li key={index}>
                                        <p>Amount: {cot.amount}</p>
                                        <p>Price: {cot.price} {cot.currency || 'N/A'}</p>
                                        <p>inclusion: {cot.inclusion} ({cot.price_unit})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.deposit?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Deposits</h4>

                            <ul>
                                {metapolicy_struct.deposit.map((deposit, index) => (
                                    <li key={index}>
                                        <p>{deposit.deposit_type}: {deposit.price} {deposit.currency} ({deposit.payment_type})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.extra_bed?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Extra Bed</h4>

                            <ul>
                                {metapolicy_struct.extra_bed.map((bed, index) => (
                                    <li key={index}>
                                        <p>Amount: {bed.amount}</p>
                                        <p>Price: {bed.price} {bed.currency || 'N/A'}</p>
                                        <p>inclusion: {bed.inclusion} ({bed.price_unit})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.internet?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Internet</h4>

                            <ul>
                                {metapolicy_struct.internet.map((internet, index) => (
                                    <li key={index}>
                                        <p>Type: {internet.internet_type}</p>
                                        <p>Price: {internet.price} {internet.currency || 'N/A'}</p>
                                        <p>inclusion: {internet.inclusion} ({internet.price_unit})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.parking?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Parking</h4>

                            <ul>
                                {metapolicy_struct.parking.map((parking, index) => (
                                    <li key={index}>
                                        <p>Type: {parking.territory_type}</p>
                                        <p>Price: {parking.price} {parking.currency || 'N/A'}</p>
                                        <p>inclusion: {parking.inclusion} ({parking.price_unit})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.pets?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Pets</h4>

                            <ul>
                                {metapolicy_struct.pets.map((pet, index) => (
                                    <li key={index}>
                                        <p>Type: {pet.pets_type}</p>
                                        <p>Price: {pet.price} {pet.currency || 'N/A'}</p>
                                        <p>inclusion: {pet.inclusion} ({pet.price_unit})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {metapolicy_struct?.shuttle?.length > 0 && (
                        <div className="border p-4 rounded-lg">
                            <h4 className="text-base font-medium text-black">Shuttle</h4>

                            <ul>
                                {metapolicy_struct.shuttle.map((shuttle, index) => (
                                    <li key={index}>
                                        <p>Type: {shuttle.destination_type}</p>
                                        <p>Price: {shuttle.price} {shuttle.currency || 'N/A'}</p>
                                        <p>inclusion: {shuttle.inclusion} ({shuttle.shuttle_type})</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetaPolicySection;