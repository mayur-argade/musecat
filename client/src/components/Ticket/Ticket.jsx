import React from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import './ticket.css'

const Ticket = ({ event, ticket, download }) => {

    const baseUrl = "http://omanwhereto.com/"

    const pageUrl = `${baseUrl}/${ticket._id}?download=true`;

    const qrdata = pageUrl;

    const qrCodeValue = JSON.stringify(qrdata);

    const handleDownloadPDF = () => {
        const element = document.getElementById('ticketContent');

        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`${ticket.firstname}_${event.title}_ticket.pdf`);
        });
    };

    console.log(download)

    if (download === true) {
        handleDownloadPDF()
    }
    const handleQRCodeScan = () => {
        // Redirect to the specified URL
        window.location.href = pageUrl;
    };
    return (
        <>
            <div id="ticketContent" class="container bg-white rounded-lg">
                <div class="item rounded-2xl">
                    <div class="item-left">
                        <div className='flex justify-between items-center align-middle '>
                            <img className='mt-5 h-5' src="/images/logo/logo.png" alt="" />
                            {/* <img className='h-10 mr-5' src="/images/assets/logoticket.png" alt="" /> */}
                            <p class="font- text-md mt-5 mr-5 ">{ticket._id}</p>
                        </div>
                        <div className='flex space-x-10'>

                            <p class="font-bold text-md mt-5">{event.title}</p>


                        </div>
                        <div class="">
                            <p className='font-bold text-md mt-5'>{ticket.firstname} {ticket.lastname}</p>
                            <p className='font-medium text-md mt-5'>{ticket.email}</p>
                            <div className='flex justify-between mt-10'>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Date</p>
                                    <p className='font-medium text-sm'>{moment(ticket.date).format("DD-MM-YYYY")}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>Class</p>
                                    <p className='font-medium text-sm'>{ticket.class}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-light text-sm'>No. of Seats</p>
                                    <p className='font-medium text-sm'>{ticket.seats}</p>
                                </div>
                                <div className='flex flex-col mr-5'>
                                    <p className='font-light text-sm'>Status</p>
                                    <p className='font-medium text-sm'>{ticket.status}</p>
                                </div>
                            </div>
                        </div>
                        <span class="tickets">Tickets</span>
                    </div>
                    <div class="item-right">
                        {/* <img className='h-60 mt-5' src="/images/assets/qrcode.png" alt="" /> */}
                        <QRCode value={qrCodeValue} className='mt-5'
                            bgColor="#C0A04C" fgColor="#ffff" level='L' size="240" onScan={handleQRCodeScan} />
                        <span class="up-border"></span>
                        <span class="down-border"></span>
                    </div>
                </div>

            </div>

            <div className='flex justify-end'>
                <button
                    onClick={handleDownloadPDF}
                    className="mt-5 bg-[#C0A04C] text-white font-bold py-2 px-4 rounded"
                >
                    Download PDF
                </button>
            </div>
        </>
    )
}

export default Ticket