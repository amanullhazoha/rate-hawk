"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareCard = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  let shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}${pathName}`;

  searchParams.toString() && (shareUrl += `?${searchParams.toString()}`);

  return (
    <div className="bg-white px-4 py-4 rounded-md shadow-md w-fit border border-border-primary">
      <h3 className="mb-3 text-lg">Share social media</h3>

      <div className="flex gap-2">
        <EmailShareButton
          url={shareUrl}
          onClick={() =>
            (window.location.href = `mailto:?subject=${encodeURIComponent(
              "Share",
            )}&body=${encodeURIComponent("Hotel detail")} ${encodeURIComponent(
              shareUrl,
            )}`)
          }
          subject="Share"
          body="Hotel detail"
        >
          <EmailIcon round={true} size={32} />
        </EmailShareButton>

        <FacebookShareButton url={shareUrl}>
          <FacebookIcon round={true} size={32} />
        </FacebookShareButton>

        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon round={true} size={32} />
        </LinkedinShareButton>

        <TelegramShareButton url={shareUrl}>
          <TelegramIcon round={true} size={32} />
        </TelegramShareButton>

        <TwitterShareButton url={shareUrl}>
          <TwitterIcon round={true} size={32} />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon round={true} size={32} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareCard;
