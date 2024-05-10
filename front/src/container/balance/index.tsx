import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import Page from "../../page";
import List from "../../component/list";

interface BalancePageProps {
    children?: React.ReactNode;
}

interface Data {
    balance: number | string;
    list: any[] | null[];
    notifications: string;
}

const BalancePage: React.FC<BalancePageProps> = () => {
    const [data, setData] = useState<Data | null>(null);

    const getData = async () => {
        try {
            const res = await fetch("http://localhost:4000/balance");

            if (!res.ok) {
                throw new Error("Error fetching data");
            }

            const data = await res.json();
            setData(data);
        } catch (e) {
            console.error("Error fatching data from server, please try again.")
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleItemClick = (id: number) => async () => {
        await fetch(`http://localhost:4000/transaction?id=${id}`);

        window.location.assign(`http://localhost:3000/transaction/${id}`);
    }

    return (
        <Page>
            <section className="balance-page">
                <div className="balance__heading">
                    <div className="balance__menu">

                        <Link to="/settings">
                            <img className="icon" src="/svg/settings.svg" />
                        </Link>

                        <p style={{ fontSize: "16px", color: "white", fontFamily: "Jost", fontWeight: "400" }}>Main wallet</p>

                        <Link to="/notifications">
                            <img className="icon" src="/svg/notifications.svg" />
                        </Link>

                    </div>

                    <div className="balance__amount">
                        {`$ ${data?.balance}` || "Calculating ..."}
                    </div>

                    <div className="balance__actions">
                        <Link to="/receive">
                            <div className="icon-button">
                                <img className="icon-button--actions" src="/svg/receive.svg" />
                            </div>
                        </Link>
                        <p className="icon-button__text">Receive</p>
                        <Link to="/send">
                            <div className="icon-button">
                                <img className="icon-button--actions" src="/svg/send.svg" />
                            </div>
                        </Link>
                        <p className="icon-button__text">Send</p>
                    </div>

                </div>

                <div className="transaction__list">
                    {data?.list.length !== 0
                        ? data?.list.map((trans) => (
                            <React.Fragment key={trans.id}>
                                <List
                                    onItemClick={handleItemClick(trans.id)}

                                    className={trans.type === 'send' ? `profile ${trans.source}` : trans.source}
                                    title={trans.source.toUpperCase()}
                                    info={trans.type === 'send' ? `- $ ${trans.amount}` : `+ $ ${trans.amount}`}
                                    details={trans.date}
                                ></List>
                            </React.Fragment>
                        ))
                        : <p>Everething will be okay</p>
                    }
                </div>

            </section>
        </Page>
    )
}

export default BalancePage;