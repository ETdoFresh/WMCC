public class PlayPause : VideoButton
{
    protected override void OnPress()
    {
        if (!videoPlayer)
            return;

        if (!videoPlayer.isPlaying || videoPlayer.playbackSpeed != 1)
        {
            videoPlayer.playbackSpeed = 1;
            videoPlayer.Play();
        }
        else
            videoPlayer.Pause();
    }
}
