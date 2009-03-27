//
//  HybridiUIAppDelegate.m
//  HybridiUI
//
//  Created by Sean Gilligan on 3/26/09.
//  Copyright __MyCompanyName__ 2009. All rights reserved.
//

#import "HybridiUIAppDelegate.h"

WebViewMode mode = modeMixed;			// modeLocal, modeRemote, or modeMixed
NSString * const HY_REMOTE_URL	= @"http://iui.googlecode.com/svn/trunk/samples/music.html";
NSString * const HY_MIXED_URL	= @"http://iui.googlecode.com/svn/trunk/sandbox/hybrid/HybridiUI/docroot/music-remote.html";
NSString * const HY_LOCAL_DIR	= @"docroot";
NSString * const HY_LOCAL_FILE	= @"music";
NSString * const HY_FILETYPE	= @"html";
NSString * const HY_MIMETYPE	= @"text/html";

@implementation HybridiUIAppDelegate

@synthesize window;


- (void)applicationDidFinishLaunching:(UIApplication *)application {
	[self loadWebView];
    [window makeKeyAndVisible];
}

// Load the UIWebView using the configured mode
- (void)loadWebView {
	if (mode == modeRemote)
	{
		NSLog(@"Everything remote");
		NSURL *url = [NSURL URLWithString:HY_REMOTE_URL];
		NSURLRequest *request = [NSURLRequest requestWithURL:url];
		[webView loadRequest:request];
	}
    else // local or mixed
	{
		// Load htmlData
		NSURL *url;				// url to load, either remotely or from file
		if (mode == modeMixed)
		{
			NSLog(@"Remote page, local resources");
			url = [NSURL URLWithString:HY_MIXED_URL];
		}
		else // mode is modeLocal
		{
			NSLog(@"Everything local");
			url	= [[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:HY_LOCAL_FILE ofType:HY_FILETYPE inDirectory:HY_LOCAL_DIR]] retain];
		}
		NSData *htmlData	= [NSData dataWithContentsOfURL:url];
		
		// Calculate baseURL
		NSString *imagePath = [[NSBundle mainBundle] resourcePath];
		imagePath = [imagePath stringByAppendingString:@"/"];
		imagePath = [imagePath stringByAppendingString:HY_LOCAL_DIR];
		imagePath = [imagePath stringByReplacingOccurrencesOfString:@"/" withString:@"//"];
		imagePath = [imagePath stringByReplacingOccurrencesOfString:@" " withString:@"%20"];
		NSURL *myBaseURL = [NSURL URLWithString: [NSString stringWithFormat:@"file:/%@//",imagePath]];
		NSLog(@"myBaseURL is %@", myBaseURL);
		
		BOOL useURLRequest = false;
		if (!useURLRequest)
		{
			// Load webview from htmlData and myBaseURL
			[webView loadData:htmlData MIMEType:HY_MIMETYPE textEncodingName:@"UTF-8" baseURL:myBaseURL];
		}
		else
		{
			[webView loadRequest:[NSURLRequest 
							  requestWithURL:url 
							  cachePolicy:NSURLRequestUseProtocolCachePolicy
							  timeoutInterval:20.0
							  ]];
		}
		
	}
}

- (void)dealloc {
    [window release];
    [super dealloc];
}


@end
