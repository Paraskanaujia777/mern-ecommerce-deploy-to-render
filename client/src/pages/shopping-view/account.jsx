import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import accImg from '../../assets/account.jpg';

import Address from '@/components/shopping-view/address'; 
import ShoppingOrders from '@/components/shopping-view/orders';




function ShoppingAccount(){


    return(
        <div className="flex flex-col">
            <div className="relative h-[250px]  w-full overflow-hidden">
                <img src={accImg} className="h-full w-full object-cover object-center" />
            </div>

            <div className='container h-full mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 '>
                    <Tabs defaultValue='orders'>
                        <TabsList className='gap-2'>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>

                        <TabsContent value ='orders'>
                            <ShoppingOrders/>
                            

                        </TabsContent>
                        <TabsContent value ='address'>

                            <Address/>

                        </TabsContent>

                    </Tabs>

                </div>

            </div>

        </div>

    )
}

export default ShoppingAccount;