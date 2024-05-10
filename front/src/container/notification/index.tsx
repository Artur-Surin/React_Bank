import React, { useState, useEffect } from "react";
import "./index.css";

import Page from "../../page";
import AccountHeader from "../../component/account-header";
import ArrowBack from "../../component/back-button";
import Alert from "../../component/alert-message";
import List from "../../component/list";
import Section from "../../component/section";

interface notificationProps {
    children: React.ReactNode
}

const Notification: React.FC<notificationProps> = ({ children }) => {
    const [data, setData] = useState<any[] | null[]>([]);

    const getData = async () => {
        try {
            const res = await fetch("http://localhost:4000/notifications");

            if (!res.ok) {
                throw new Error("Error to fetching data");
            }

            const data = await res.json();
            setData(data);
        } catch (e) {
            console.error("Error to get a data from the server!");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const whenNotificationSent = (startTime: number, endTime: number): string => {
        const timeDifference = endTime - startTime;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % 1000 * 60 * 60) / (1000 * 60));

        if (days < 1) {
            if (hours < 1) {
                return (`${minutes}min ago`);
            }
            return `${hours}h ${minutes}min ago`;
        } else {
            return `${days}d ${hours}h ${minutes}min ago`;
        }
    };

    const handleCheck = (id: number) => async () => {
        try {
            const res = await fetch(`http://localhost:4000/notifications/update?id=${id}`);

            if (!res.ok) {
                throw new Error("Error to fetch fata");
            }

            getData();

        } catch (e) {
            console.error("Error handle item click: ", e);
        }
    }

    return (
        <Page>
           <Section>

                <AccountHeader title="Notifications">
                    <ArrowBack />
                </AccountHeader>

                <div className="notifications__list">
                    {data.length !== 0
                        ? data?.slice().sort((a, b) => b.notificationId - a.notifinicationId)
                            .map((note) => (
                                <React.Fragment key={note.notificationId}>
                                    <List
                                        onItemClick={handleCheck(note.notificationId)}
                                        className={note.action === `notification` ? `notification` : `warn`}
                                        style={{
                                            ...(note.ifUnread === false ? {} : { border: `8px solid rgba(217, 43, 73, 0.5)`, borderRadius: `50%` }),
                                        }}
                                        title={`New ${note.action.toUpperCase()} by ${note.name}`}
                                        info=''
                                        details={whenNotificationSent(note.date, new Date().getTime())}
                                        notificationInfo={note.info}
                                    ></List>
                                </React.Fragment>
                            ))
                        : <Alert> You have no notifications yet.</Alert>
                    }
                </div>

            </Section>
        </Page>
    )
}

export default Notification;