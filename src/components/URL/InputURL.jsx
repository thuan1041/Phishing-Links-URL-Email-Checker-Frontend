import React, { useEffect, useState } from 'react';
import { Input, Button, Table, Space, message, Card } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import './InputURL.scss';

const { TextArea } = Input;

const splitString = (str, maxLength) => {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return str.match(regex);
}

const renderColumn = (text) => {
    const splittedStrings = splitString(text, 30);
    return (
        <span>
            {splittedStrings.map((part, index) => (
                <React.Fragment key={index}>
                    <div><a href={text} target="_blank" rel="noopener noreferrer">{part}</a></div>
                </React.Fragment>
            ))}
        </span>
    );
}

const renderRowData = (data, rowData) => {
    const index = data.findIndex(item => item === rowData) + 1;
    return (
        <div>
            <div><b>No.: {index}</b></div>
            <div>
                <b>Original URL:</b>{" "}
                <a href={rowData.originalUrl}>{rowData.originalUrl}</a>
            </div>
            <div>
                <b>Redirected URL:</b>{" "}
                <a href={rowData.redirectedUrl}>{rowData.redirectedUrl}</a>
            </div>
            <div><b>URL Status:</b> {rowData.urlStatus === 1 ? 'Suspicious' : rowData.urlStatus === 2 ? 'Safe' : rowData.urlStatus === 3 ? 'Unknown' : 'Error'}</div>
        </div>
    );
};

const InputURL = () => {
    const [inputValue, setInputValue] = useState('');
    const [urlData, setUrlData] = useState([]);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onChange = (value) => {
        message.success("Xác minh người máy thành công!");
        setIsCaptchaVerified(true);
    }

    const onExpired = () => {
        message.warning("CAPTCHA đã hết hạn, vui lòng xác minh lại!");
        setIsCaptchaVerified(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        if (isCaptchaVerified) {
            const urls = inputValue.split(/[\n,;]+/).map(url => url.trim()).filter(url => url);
            const formattedUrls = urls.map(url => ({
                key: url,
                originalUrl: url,
                redirectedUrl: url,
                urlStatus: Math.floor(Math.random() * 3) + 1,
            }));

            setUrlData(formattedUrls);
            message.loading("Đang kiểm tra URL...");
        } else {
            message.error("Vui lòng xác minh người máy trước khi kiểm tra URL!");
        }
    };

    const handleTableColumn = (data) => {
        if (data.length == 1) {
            return [
                {
                    title: 'Original URL',
                    dataIndex: 'originalUrl',
                    key: 'originalUrl',
                    render: windowWidth > 768 ? renderColumn : renderRowData,
                },
                {
                    title: 'Redirected URL',
                    dataIndex: 'redirectedUrl',
                    key: 'redirectedUrl',
                    render: windowWidth > 768 ? renderColumn : renderRowData,
                },
                {
                    title: 'URL Status',
                    dataIndex: 'urlStatus',
                    key: 'urlStatus',
                    render: windowWidth > 768 ? (text) => (text == 1) ? 'Suspicious' : (text == 2) ? 'Safe' : (text = "") ? 'Unknown' : 'Error' : renderRowData,
                },
            ];
        } else {
            return [
                {
                    title: 'No.',
                    dataIndex: 'key',
                    key: 'key',
                    render: (text, record, index) => index + 1,
                },
                {
                    title: 'Original URL',
                    dataIndex: 'originalUrl',
                    key: 'originalUrl',
                    render: windowWidth > 768 ? renderColumn : renderRowData,
                },
                {
                    title: 'Redirected URL',
                    dataIndex: 'redirectedUrl',
                    key: 'redirectedUrl',
                    render: windowWidth > 768 ? renderColumn : renderRowData,
                },
                {
                    title: 'URL Status',
                    dataIndex: 'urlStatus',
                    key: 'urlStatus',
                    render: windowWidth > 768 ? (text) => (text == 1) ? 'Suspicious' : (text == 2) ? 'Safe' : (text = "") ? 'Unknown' : 'Error' : renderRowData,
                },
            ];
        }
    }

    return (
        <div>
            <Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
                <Card style={{ padding: 6 }}>
                    <div>
                        <h1 style={{ fontSize: '22px' }}>Phishing Links (URL) & Email Checker</h1>
                        <p style={{ fontSize: '18px' }}>Enter URLs to check if they are safe to visit</p>
                    </div>
                    <TextArea
                        style={{ marginTop: '6px' }}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter URLs separated by commas, semicolons, or newlines"
                        rows={10}
                    />
                    <ReCAPTCHA
                        style={{ marginTop: '8px' }}
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={onChange}
                        onExpired={onExpired}
                    />
                    <Button
                        style={{ marginTop: '6px' }}
                        type="primary"
                        onClick={handleSubmit}
                        disabled={!isCaptchaVerified}>
                        Check
                    </Button>
                </Card>
            </Space>
            {urlData.length > 0 && (
                (windowWidth > 768) ? (
                    <Card style={{ marginTop: '10px', padding: '6px' }}>
                        <h3>Results summary</h3>
                        <Table
                            dataSource={urlData}
                            columns={handleTableColumn(urlData)}
                            pagination={false}
                            style={{ marginTop: '10px' }}
                        />
                    </Card>
                ) : (
                    <Card style={{ marginTop: '10px', padding: '6px' }}>
                        <h3>Results summary</h3>
                        {urlData.map((rowData, index) => (
                            <div key={index} style={{ marginBottom: '20px' }}>
                                {renderRowData(urlData, rowData)}
                            </div>
                        ))}
                    </Card>
                )
            )}

        </div>
    );
};

export default InputURL;