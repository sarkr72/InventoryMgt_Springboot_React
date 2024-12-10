// Pdf.js
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { getSupplierByName } from '../services/SupplierService';
import { productsList } from '../services/ProductService';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        color: 'blue',
    },
    text: {
        fontSize: 13,
    },
    bold: {
        fontWeight: 'bold',
    },
    spacing: {
        marginBottom: 30,
    },
    underLine: {
        textDecoration: "underline",
    },
    flexContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexContainer2: {
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deliverTo: {
        fontSize: 20,
        color: 'red',
    },
    table: {
        marginTop: 20,
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tableCell: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    tableCellId: {
        flex: 1,
        padding: 5,
        borderRightWidth: 1,
        borderRightColor: '#000',
        width: "50px"
    },
    tableCellLast: {
        borderRightWidth: 0, // Remove right border for the last cell
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
});

const Pdf = ({ order }) => {
    const company = JSON.parse(localStorage.getItem("company"));
    const [supplier, setSupplier] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (order?.supplier) {
            getSupplierByName(order.supplier.trim())
                .then((response) => {
                    setSupplier(response?.data);
                })
                .catch((error) => {
                    console.error("Error fetching supplier:", error);
                });
        }
        productsList().then((response)=>{
            setProducts(response.data);
        })
    }, [order]);
    console.log("order: ", order)
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{company?.name}</Text>
                    <Text style={styles.text}>{company?.address}</Text>
                    <Text style={styles.text}>{company?.contact}</Text>
                    <View style={styles.spacing} />
                    < View style={styles.flexContainer} >
                    <View>
                            <Text style={styles.text}>Purchase From</Text>
                            <Text style={styles.bold}>{order?.supplier}</Text>
                            <Text style={styles.text}>{supplier?.address}</Text>
                            <Text style={styles.text}>{supplier?.contact}</Text>
                        </View>

                        <View>
                            <Text style={styles.deliverTo}>Purchase Order</Text>
                            <View style={styles.flexContainer2} >
                                <View style={styles.flexContainer}><View><Text style={styles.text}>P.O No#           </Text></View> <View><Text style={styles.text}>{order?.po}</Text> </View></View>
                                <View style={styles.flexContainer}><View><Text style={styles.text}>Date          </Text></View> <View><Text style={styles.text}>{order?.date}</Text> </View></View>
                                <View style={styles.flexContainer}><View><Text style={styles.text}>Credit Terms        </Text></View> <View><Text style={styles.text}>Check</Text> </View></View>
                            </View>
                        </View>

                    </View>
                    {/* Table-like Structure */}
                    <View style={styles.table}>
                        {/* Header Row */}
                        <View style={[styles.tableRow, styles.headerCell]}>
                            <Text style={styles.tableCellId}>#</Text>
                            <Text style={styles.tableCell}>Description</Text>
                            <Text style={styles.tableCell}>Quantity</Text>
                            <Text style={styles.tableCell}>Price</Text>
                            <Text style={styles.tableCellLast}>Total</Text>
                        </View>
                        {order?.productNames?.map((item, index) => (
                            <View style={styles.tableRow} key={item}>
                                <Text style={styles.tableCellId}>{index + 1}</Text> {/* Auto-incrementing ID */}
                                <Text style={styles.tableCell}>{item}</Text>
                                <Text style={styles.tableCell}>{products.find(p => p.name === item)?.unitPrice || 'Not Found'}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default Pdf;