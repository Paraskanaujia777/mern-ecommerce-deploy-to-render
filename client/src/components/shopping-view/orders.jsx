import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";


function ShoppingOrders() {

    return <Card>
        <CardHeader>
            <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className =''>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead>
                            <span className="sr-only">Details</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>123456</TableCell>
                        <TableCell>19/12/25</TableCell>
                        <TableCell>In Process</TableCell>
                        <TableCell>1000</TableCell>
                        <TableCell>
                            <Button>View Details</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>123456</TableCell>
                        <TableCell>19/12/25</TableCell>
                        <TableCell>In Process</TableCell>
                        <TableCell>1000</TableCell>
                        <TableCell>
                            <Button>View Details</Button>
                        </TableCell>
                    </TableRow>
                    
                </TableBody>

                <TableFooter>
                </TableFooter>

            </Table>
        </CardContent>
    </Card>

}

export default ShoppingOrders;