import styles from "./App.css"
import React, {useEffect, useState} from "react";

export default function App() {
    const [journalEntries, setJournalEntries] = useState([]);
    const [currentJournalId, setCurrentJournalId] = useState(null);
    const [currentJournalDate, setCurrentJournalDate] = useState(null);
    const [currentJournalBody, setCurrentJournalBody] = useState("");
    const [currentJournalDirty, setCurrentJournalDirty] = useState(false);

    useEffect(() => {
        fetch("/api/journal-entries/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setJournalEntries(data);
            });
    }, []);

    useEffect(() => {
        if (!currentJournalId) return;
        fetch(
            `/api/journal-entries/${currentJournalId}/`
        ).then(response => {
            return response.json();
        }).then(data => {
            setCurrentJournalDate(data.date);
            setCurrentJournalBody(data.body);
        });
    }, [currentJournalId]);

    function updateJournalEntry() {
        if (!currentJournalDate) return;
        if (!currentJournalBody) return;
        if (!currentJournalDirty) return;

        const newJournal = !currentJournalId;

        const request = (
            newJournal
                ? fetch(`/api/journal-entries/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        date: currentJournalDate,
                        body: currentJournalBody,
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                : fetch(`/api/journal-entries/${currentJournalId}/`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        date: currentJournalDate,
                        body: currentJournalBody,
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
        )

        request.then(response => {
            setCurrentJournalDirty(false);
            return response.json();
        }).then(data => {
            const journalEntriesClone = [].concat(journalEntries)
            const journalEntriesToEdit = journalEntriesClone.filter(journalEntry => journalEntry.id === data.id)

            if (newJournal) {
                journalEntriesClone.unshift(data);
                setCurrentJournalId(data.id);
            } else {
                journalEntriesToEdit.forEach(journalEntry => {
                    journalEntry.date = data.date;
                    journalEntry.body = data.body;
                });
            }

            setJournalEntries(journalEntriesClone);
        });
    }

    function showJournalEntry(id) {
        setCurrentJournalId(id);
    }

    function addNewJournalEntry() {
        setCurrentJournalId(null);
        setCurrentJournalDate(new Date().toISOString().split('T')[0]);
        setCurrentJournalBody("");
    }

    return (
        <div className={styles.AppContainer}>
            <div className={styles.AppJournalEntryList}>
                <li className={styles.AppJournalEntryListItem} key={null}>
                    <a onClick={() => addNewJournalEntry()} href={'#'}>
                        New Entry
                    </a>
                </li>
                {journalEntries.map(journalEntry => {
                    return (
                        <li className={styles.AppJournalEntryListItem} key={journalEntry.id}>
                            <a onClick={() => showJournalEntry(journalEntry.id)} href={'#'}>
                                {journalEntry.date}
                            </a>
                        </li>
                    );
                })}
            </div>
            <div className={styles.AppJournalEntryDetail}>
                {currentJournalDate && (
                    <div>
                        <input
                            type={"text"}
                            value={currentJournalDate}
                            onChange={(event) => {
                                setCurrentJournalDate(event.target.value);
                                setCurrentJournalDirty(true);
                            }}
                            onBlur={updateJournalEntry}
                        />
                        <div>
                            <textarea
                                className={styles.AppJournalBody}
                                value={currentJournalBody}
                                rows={20}
                                cols={40}
                                onChange={(event) => {
                                    setCurrentJournalBody(event.target.value);
                                    setCurrentJournalDirty(true);
                                }}
                                onBlur={updateJournalEntry}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
