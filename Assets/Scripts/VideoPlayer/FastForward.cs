using UnityEngine;

public class FastForward : VideoButton
{
    protected override void OnPress()
    {
        if (!videoPlayer)
            return;

        if (!videoPlayer.canSetPlaybackSpeed)
            return;

        if (videoPlayer.playbackSpeed < -8)
            videoPlayer.playbackSpeed = -8;
        else if (videoPlayer.playbackSpeed < -4)
            videoPlayer.playbackSpeed = -4;
        else if (videoPlayer.playbackSpeed < -2)
            videoPlayer.playbackSpeed = -2;
        else if (videoPlayer.playbackSpeed < -1)
            videoPlayer.playbackSpeed = -1;
        else if (videoPlayer.playbackSpeed < 0)
            videoPlayer.playbackSpeed = 0;
        else if (videoPlayer.playbackSpeed < 1)
            videoPlayer.playbackSpeed = 1;
        else if (videoPlayer.playbackSpeed < 2)
            videoPlayer.playbackSpeed = 2;
        else if (videoPlayer.playbackSpeed < 4)
            videoPlayer.playbackSpeed = 4;
        else if (videoPlayer.playbackSpeed < 8)
            videoPlayer.playbackSpeed = 8;
        else if (videoPlayer.playbackSpeed < 16)
            videoPlayer.playbackSpeed = 16;
    }
}